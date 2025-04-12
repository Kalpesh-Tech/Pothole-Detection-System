# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.responses import StreamingResponse, FileResponse, JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# import cv2
# import os
# import logging
# import shutil
# from ultralytics import YOLO

# # Set up logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # In production, specify exact origins
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load the model
# try:
#     model = YOLO("best (2).pt")
#     logger.info("Model loaded successfully")
# except Exception as e:
#     logger.error(f"Error loading model: {e}")
#     model = None

# UPLOAD_DIR = "backend"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# LATEST_FILENAME = os.path.join(UPLOAD_DIR, "latest_input.mp4")
# LATEST_OUTPUT = os.path.join(UPLOAD_DIR, "latest_output.mp4")

# @app.post("/upload")
# async def upload_video(file: UploadFile = File(...)):
#     try:
#         logger.info(f"Receiving upload: {file.filename}")
        
#         # Save the file with proper error handling
#         with open(LATEST_FILENAME, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)
        
#         # Verify the file was saved correctly
#         if not os.path.exists(LATEST_FILENAME) or os.path.getsize(LATEST_FILENAME) == 0:
#             raise HTTPException(status_code=400, detail="File upload failed or empty file")
            
#         # Verify the file is a valid video
#         cap = cv2.VideoCapture(LATEST_FILENAME)
#         if not cap.isOpened():
#             raise HTTPException(status_code=400, detail="Uploaded file is not a valid video")
#         cap.release()
        
#         logger.info(f"File saved successfully at {LATEST_FILENAME}")
#         return JSONResponse({"message": "File uploaded successfully", "filename": file.filename})
    
#     except Exception as e:
#         logger.error(f"Upload error: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

# @app.get("/stream")
# def stream_video():
#     if model is None:
#         return JSONResponse({"error": "Model not loaded properly"}, status_code=500)
        
#     if not os.path.exists(LATEST_FILENAME):
#         return JSONResponse({"error": "No video has been uploaded yet"}, status_code=404)
    
#     logger.info("Starting video processing stream")
#     cap = cv2.VideoCapture(LATEST_FILENAME)

#     if not cap.isOpened():
#         logger.error(f"Failed to open video: {LATEST_FILENAME}")
#         return JSONResponse({"error": "Video not found or failed to open"}, status_code=404)

#     # Get video properties
#     fourcc = cv2.VideoWriter_fourcc(*'mp4v')
#     fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
#     width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
#     height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
#     logger.info(f"Video properties: {width}x{height} at {fps} FPS")
    
#     # Create output video writer
#     out = cv2.VideoWriter(LATEST_OUTPUT, fourcc, fps, (width, height))

#     def generate():
#         frame_count = 0
#         try:
#             while cap.isOpened():
#                 ret, frame = cap.read()
#                 if not ret:
#                     logger.info("End of video stream reached")
#                     break

#                 frame_count += 1
#                 if frame_count % 10 == 0:  # Log every 10th frame
#                     logger.info(f"Processing frame {frame_count}")

#                 # Run detection
#                 try:
#                     results = model.predict(source=frame, conf=0.25, save=False)
#                     annotated = results[0].plot()
#                     out.write(annotated)

#                     # Convert to JPEG and yield
#                     _, jpeg = cv2.imencode(".jpg", annotated)
#                     frame_bytes = jpeg.tobytes()
#                     yield (
#                         b"--frame\r\n"
#                         b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
#                     )
#                 except Exception as e:
#                     logger.error(f"Error processing frame {frame_count}: {str(e)}")
#                     # Send an error frame with text
#                     error_frame = frame.copy()
#                     cv2.putText(error_frame, f"Error: {str(e)}", (50, 50), 
#                                 cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
#                     _, jpeg = cv2.imencode(".jpg", error_frame)
#                     frame_bytes = jpeg.tobytes()
#                     yield (
#                         b"--frame\r\n"
#                         b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
#                     )
#         except Exception as e:
#             logger.error(f"Stream generation error: {str(e)}")
#         finally:
#             logger.info("Closing video resources")
#             cap.release()
#             out.release()

#     return StreamingResponse(
#         generate(),
#         media_type="multipart/x-mixed-replace; boundary=frame"
#     )

# @app.get("/video/latest")
# def get_latest_video():
#     if os.path.exists(LATEST_OUTPUT):
#         logger.info(f"Serving processed video: {LATEST_OUTPUT}")
#         return FileResponse(LATEST_OUTPUT, media_type="video/mp4", filename="processed_potholes.mp4")
#     logger.warning("Processed video not found")
#     return JSONResponse({"error": "No processed video available"}, status_code=404)

# @app.get("/health")
# def health_check():
#     """Simple endpoint to check if the server is running"""
#     model_status = "loaded" if model is not None else "not loaded"
#     return {"status": "online", "model": model_status}

# if __name__ == "__main__":
#     import uvicorn
#     logger.info("Starting FastAPI server")
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse, FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2
import os
import logging
import shutil
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
import time
from typing import List, Dict, Set
import uuid
from ultralytics import YOLO

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email configuration
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USERNAME = "kalpeshborse311@gmail.com"  # Update with your email
EMAIL_PASSWORD = "lrim cycy dlba ykxd"  # Use app password for Gmail
EMAIL_RECIPIENT = "kborse112@gmail.com"  # Update with recipient email

# Detection tracking
detected_potholes = {}  # Dictionary to track detected potholes
notification_cooldown = 10  # seconds between notifications for the same pothole

# Load the model
try:
    model = YOLO("best (2).pt")
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    model = None

UPLOAD_DIR = "backend"
DETECTIONS_DIR = os.path.join(UPLOAD_DIR, "detections")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(DETECTIONS_DIR, exist_ok=True)

LATEST_FILENAME = os.path.join(UPLOAD_DIR, "latest_input.mp4")
LATEST_OUTPUT = os.path.join(UPLOAD_DIR, "latest_output.mp4")

def send_email_notification(location: Dict, image_path: str, detection_id: str):
    """Send email notification with pothole information and image"""
    try:
        msg = MIMEMultipart()
        msg['Subject'] = f'Pothole Detection Alert #{detection_id[:8]}'
        msg['From'] = EMAIL_USERNAME
        msg['To'] = EMAIL_RECIPIENT
        
        # Email body
        body = f"""
        <html>
        <body>
            <h2>Pothole Detection Alert</h2>
            <p><strong>Detection ID:</strong> {detection_id}</p>
            <p><strong>Time:</strong> {time.strftime('%Y-%m-%d %H:%M:%S')}</p>
            <p><strong>Location:</strong> Latitude: {location.get('latitude', 'N/A')}, Longitude: {location.get('longitude', 'N/A')}</p>
            <p><strong>Address:</strong> {location.get('address', 'N/A')}</p>
            <p>Please check the attached image for details.</p>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(body, 'html'))
        
        # Attach image
        if os.path.exists(image_path):
            with open(image_path, 'rb') as img_file:
                img_data = img_file.read()
                image = MIMEImage(img_data)
                image.add_header('Content-Disposition', 'attachment', filename=f'pothole_{detection_id[:8]}.jpg')
                msg.attach(image)
        
        # Send email
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            server.send_message(msg)
        
        logger.info(f"Email notification sent for pothole {detection_id[:8]}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

@app.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    try:
        logger.info(f"Receiving upload: {file.filename}")
        
        # Reset pothole tracking
        global detected_potholes
        detected_potholes = {}
        
        # Save the file with proper error handling
        with open(LATEST_FILENAME, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Verify the file was saved correctly
        if not os.path.exists(LATEST_FILENAME) or os.path.getsize(LATEST_FILENAME) == 0:
            raise HTTPException(status_code=400, detail="File upload failed or empty file")
            
        # Verify the file is a valid video
        cap = cv2.VideoCapture(LATEST_FILENAME)
        if not cap.isOpened():
            raise HTTPException(status_code=400, detail="Uploaded file is not a valid video")
        cap.release()
        
        logger.info(f"File saved successfully at {LATEST_FILENAME}")
        return JSONResponse({"message": "File uploaded successfully", "filename": file.filename})
    
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.post("/location")
async def update_location(location_data: dict):
    """
    Store the current location for pothole notifications
    Expects: {"latitude": float, "longitude": float, "address": string}
    """
    try:
        app.state.current_location = location_data
        logger.info(f"Updated location: {location_data}")
        return {"message": "Location updated successfully"}
    except Exception as e:
        logger.error(f"Error updating location: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def get_current_location():
    """Get the most recently stored location"""
    if hasattr(app.state, 'current_location'):
        return app.state.current_location
    return {"latitude": "Unknown", "longitude": "Unknown", "address": "Unknown location"}

@app.get("/stream")
def stream_video(background_tasks: BackgroundTasks):
    if model is None:
        return JSONResponse({"error": "Model not loaded properly"}, status_code=500)
        
    if not os.path.exists(LATEST_FILENAME):
        return JSONResponse({"error": "No video has been uploaded yet"}, status_code=404)
    
    logger.info("Starting video processing stream")
    cap = cv2.VideoCapture(LATEST_FILENAME)

    if not cap.isOpened():
        logger.error(f"Failed to open video: {LATEST_FILENAME}")
        return JSONResponse({"error": "Video not found or failed to open"}, status_code=404)

    # Get video properties
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    logger.info(f"Video properties: {width}x{height} at {fps} FPS")
    
    # Create output video writer
    out = cv2.VideoWriter(LATEST_OUTPUT, fourcc, fps, (width, height))

    def generate():
        frame_count = 0
        try:
            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    logger.info("End of video stream reached")
                    break

                frame_count += 1
                if frame_count % 10 == 0:  # Log every 10th frame
                    logger.info(f"Processing frame {frame_count}")

                # Run detection
                try:
                    results = model.predict(source=frame, conf=0.25, save=False)
                    result = results[0]
                    annotated = result.plot()
                    out.write(annotated)
                    
                    # Check for pothole detections
                    if len(result.boxes) > 0:
                        current_time = time.time()
                        current_location = get_current_location()
                        
                        for i, box in enumerate(result.boxes):
                            # Create a unique identifier for this detection based on box position
                            x1, y1, x2, y2 = [int(coord) for coord in box.xyxy[0].tolist()]
                            box_center = ((x1 + x2) // 2, (y1 + y2) // 2)
                            confidence = float(box.conf[0])
                            
                            # Only process high confidence detections
                            if confidence >= 0.5:
                                # Create a unique-enough ID for this detection
                                detection_area = (x2-x1) * (y2-y1)
                                detection_key = f"{box_center[0]}_{box_center[1]}_{detection_area}"
                                
                                # Check if this is a new detection or if cooldown period has passed
                                if (detection_key not in detected_potholes or 
                                    current_time - detected_potholes.get(detection_key, 0) > notification_cooldown):
                                    
                                    # Mark this detection as processed and record timestamp
                                    detected_potholes[detection_key] = current_time
                                    
                                    # Generate unique ID for this detection
                                    detection_id = str(uuid.uuid4())
                                    
                                    # Save the detection image
                                    detection_image_path = os.path.join(DETECTIONS_DIR, f"pothole_{detection_id}.jpg")
                                    detection_image = frame.copy()
                                    cv2.rectangle(detection_image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                                    cv2.putText(detection_image, f"Pothole: {confidence:.2f}", 
                                                (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
                                    cv2.imwrite(detection_image_path, detection_image)
                                    
                                    # Send notification in background
                                    logger.info(f"New pothole detected! ID: {detection_id[:8]}")
                                    background_tasks.add_task(
                                        send_email_notification, 
                                        current_location, 
                                        detection_image_path, 
                                        detection_id
                                    )

                    # Convert to JPEG and yield
                    _, jpeg = cv2.imencode(".jpg", annotated)
                    frame_bytes = jpeg.tobytes()
                    yield (
                        b"--frame\r\n"
                        b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
                    )
                except Exception as e:
                    logger.error(f"Error processing frame {frame_count}: {str(e)}")
                    # Send an error frame with text
                    error_frame = frame.copy()
                    cv2.putText(error_frame, f"Error: {str(e)}", (50, 50), 
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    _, jpeg = cv2.imencode(".jpg", error_frame)
                    frame_bytes = jpeg.tobytes()
                    yield (
                        b"--frame\r\n"
                        b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
                    )
        except Exception as e:
            logger.error(f"Stream generation error: {str(e)}")
        finally:
            logger.info("Closing video resources")
            cap.release()
            out.release()

    return StreamingResponse(
        generate(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

@app.get("/video/latest")
def get_latest_video():
    if os.path.exists(LATEST_OUTPUT):
        logger.info(f"Serving processed video: {LATEST_OUTPUT}")
        return FileResponse(LATEST_OUTPUT, media_type="video/mp4", filename="processed_potholes.mp4")
    logger.warning("Processed video not found")
    return JSONResponse({"error": "No processed video available"}, status_code=404)

@app.get("/health")
def health_check():
    """Simple endpoint to check if the server is running"""
    model_status = "loaded" if model is not None else "not loaded"
    return {"status": "online", "model": model_status}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server")
    uvicorn.run(app, host="0.0.0.0", port=8000)