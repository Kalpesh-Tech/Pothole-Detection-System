// // import React, { useState } from "react";
// // import { Upload, Camera } from "lucide-react";

// // function Home() {
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [showStream, setShowStream] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file && file.type === "video/mp4") {
// //       setSelectedFile(file);
// //       setError("");
// //       setShowStream(false);
// //       setIsProcessing(false);
// //     } else {
// //       setError("Please select a valid MP4 file.");
// //     }
// //   };

// //   const handleStartDetection = async () => {
// //     if (!selectedFile) {
// //       setError("Please upload a video first.");
// //       return;
// //     }

// //     setIsProcessing(true);
// //     setShowStream(false);
// //     setError("");

// //     const formData = new FormData();
// //     formData.append("file", selectedFile);

// //     try {
// //       // First upload the file
// //       const uploadRes = await fetch("http://localhost:8000/upload", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (!uploadRes.ok) {
// //         const errorData = await uploadRes.json();
// //         throw new Error(errorData.error || "Upload failed");
// //       }
      
// //       // Wait longer for the backend to initialize processing
// //       await new Promise(resolve => setTimeout(resolve, 3000));
      
// //       // Now show the stream
// //       setShowStream(true);
      
// //     } catch (err) {
// //       console.error("Detection failed:", err);
// //       setError(`Detection failed: ${err.message}`);
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-4xl font-bold text-white mb-4">Smarter Roads Start Here</h1>
// //       <p className="text-gray-300 mb-6">Upload video and detect potholes frame-by-frame in real time</p>

// //       {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //         <div className="p-6 bg-secondary rounded-lg border-2 border-dashed border-gray-600">
// //           <input type="file" accept="video/mp4" onChange={handleFileChange} className="text-white mb-2" />
// //           <Upload className="w-10 h-10 text-blue-500 mx-auto my-2" />
// //           <p className="text-center text-white">Upload MP4 file: {selectedFile?.name}</p>
// //         </div>

// //         <div className="p-6 bg-secondary rounded-lg text-center">
// //           <Camera className="w-10 h-10 text-blue-500 mx-auto mb-2" />
// //           <button
// //             onClick={handleStartDetection}
// //             className={`mt-2 px-6 py-2 rounded-lg text-white font-semibold ${
// //               isProcessing ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
// //             }`}
// //             disabled={isProcessing}
// //           >
// //             {isProcessing ? "Processing..." : "Start Detection"}
// //           </button>
// //         </div>
// //       </div>

// //       {/* MJPEG Stream Display */}
// //       {showStream && (
// //         <div className="mt-8 bg-secondary p-4 rounded-lg">
// //           <h3 className="text-white text-lg font-semibold mb-2">Live Processed Video:</h3>
// //           <img
// //             src="http://localhost:8000/stream"
// //             alt="Live Detection Stream"
// //             className="w-full max-h-[400px] object-contain rounded-lg border border-gray-700"
// //           />
// //         </div>
// //       )}

// //       {/* Final Download Link */}
// //       {showStream && (
// //         <div className="mt-6">
// //           <a
// //             href="http://localhost:8000/video/latest"
// //             className="text-blue-400 hover:text-blue-300 font-semibold underline"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             ⬇️ Download Final Processed Video
// //           </a>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Home;

// import React, { useState, useRef } from "react";
// import { Upload, Camera } from "lucide-react";

// function Home() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showStream, setShowStream] = useState(false);
//   const [error, setError] = useState("");
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type === "video/mp4") {
//       setSelectedFile(file);
//       setError("");
//       setShowStream(false);
//       setIsProcessing(false);
//     } else if (file) {
//       setError("Please select a valid MP4 file.");
//     }
//   };

//   const handleUploadClick = () => {
//     // Trigger the hidden file input
//     fileInputRef.current.click();
//   };

//   const handleStartDetection = async () => {
//     if (!selectedFile) {
//       setError("Please upload a video first.");
//       return;
//     }

//     setIsProcessing(true);
//     setShowStream(false);
//     setError("");

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       // First upload the file
//       const uploadRes = await fetch("http://localhost:8000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (!uploadRes.ok) {
//         const errorData = await uploadRes.json();
//         throw new Error(errorData.error || "Upload failed");
//       }
      
//       // Wait longer for the backend to initialize processing
//       await new Promise(resolve => setTimeout(resolve, 3000));
      
//       // Now show the stream
//       setShowStream(true);
      
//     } catch (err) {
//       console.error("Detection failed:", err);
//       setError(`Detection failed: ${err.message}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-4xl font-bold text-white mb-4">Smarter Roads Start Here</h1>
//       <p className="text-gray-300 mb-6">Upload video and detect potholes frame-by-frame in real time</p>

//       {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div 
//           className="p-6 bg-secondary rounded-lg border-2 border-dashed border-gray-600 cursor-pointer hover:bg-secondary/80"
//           onClick={handleUploadClick}
//         >
//           {/* Hidden file input */}
//           <input 
//             type="file" 
//             ref={fileInputRef}
//             accept="video/mp4" 
//             onChange={handleFileChange} 
//             className="hidden" 
//           />
          
//           <Upload className="w-10 h-10 text-blue-500 mx-auto my-2" />
//           <p className="text-center text-white">
//             {selectedFile ? `Selected: ${selectedFile.name}` : "Upload MP4 file"}
//           </p>
//         </div>

//         <div className="p-6 bg-secondary rounded-lg text-center">
//           <Camera className="w-10 h-10 text-blue-500 mx-auto mb-2" />
//           <button
//             onClick={handleStartDetection}
//             className={`mt-2 px-6 py-2 rounded-lg text-white font-semibold ${
//               isProcessing ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//             disabled={isProcessing}
//           >
//             {isProcessing ? "Processing..." : "Start Detection"}
//           </button>
//         </div>
//       </div>

//       {/* MJPEG Stream Display */}
//       {showStream && (
//         <div className="mt-8 bg-secondary p-4 rounded-lg">
//           <h3 className="text-white text-lg font-semibold mb-2">Live Processed Video:</h3>
//           <img
//             src="http://localhost:8000/stream"
//             alt="Live Detection Stream"
//             className="w-full max-h-[400px] object-contain rounded-lg border border-gray-700"
//           />
//         </div>
//       )}

//       {/* Final Download Link */}
//       {showStream && (
//         <div className="mt-6">
//           <a
//             href="http://localhost:8000/video/latest"
//             className="text-blue-400 hover:text-blue-300 font-semibold underline"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             ⬇️ Download Final Processed Video
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;


import React, { useState, useRef, useEffect } from "react";
import { Upload, Camera, MapPin, Mail, Settings } from "lucide-react";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStream, setShowStream] = useState(false);
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: "Unknown location",
    status: "Not tracking"
  });
  const fileInputRef = useRef(null);

  // Get location on component mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      setLocation(prev => ({ ...prev, status: "Requesting permission..." }));
      
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation(prev => ({ 
            ...prev, 
            latitude, 
            longitude, 
            status: "Location acquired" 
          }));
          
          // Get address from coordinates using reverse geocoding
          fetchAddressFromCoords(latitude, longitude);
          
          // Send location to backend
          updateLocationOnServer(latitude, longitude, "Fetching address...");
          
          // Set up continuous location tracking
          navigator.geolocation.watchPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setLocation(prev => {
                // Only update if location has changed significantly
                if (
                  !prev.latitude || 
                  Math.abs(prev.latitude - latitude) > 0.0001 || 
                  Math.abs(prev.longitude - longitude) > 0.0001
                ) {
                  fetchAddressFromCoords(latitude, longitude);
                  updateLocationOnServer(latitude, longitude, prev.address);
                  return { ...prev, latitude, longitude, status: "Tracking" };
                }
                return prev;
              });
            },
            err => {
              console.error("Location tracking error:", err);
              setLocation(prev => ({ ...prev, status: `Error: ${err.message}` }));
            },
            { enableHighAccuracy: true }
          );
        },
        err => {
          console.error("Geolocation error:", err);
          setLocation(prev => ({ ...prev, status: `Error: ${err.message}` }));
        }
      );
    } else {
      setLocation(prev => ({ ...prev, status: "Geolocation not supported" }));
    }
  };

  const fetchAddressFromCoords = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        const address = data.display_name;
        setLocation(prev => ({ ...prev, address }));
        updateLocationOnServer(latitude, longitude, address);
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  const updateLocationOnServer = async (latitude, longitude, address) => {
    try {
      await fetch("http://localhost:8000/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude, longitude, address }),
      });
    } catch (err) {
      console.error("Error updating location on server:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      setSelectedFile(file);
      setError("");
      setShowStream(false);
      setIsProcessing(false);
    } else if (file) {
      setError("Please select a valid MP4 file.");
    }
  };

  const handleUploadClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleStartDetection = async () => {
    if (!selectedFile) {
      setError("Please upload a video first.");
      return;
    }

    // Clear previous notifications
    setNotifications([]);
    setIsProcessing(true);
    setShowStream(false);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // First upload the file
      const uploadRes = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.error || "Upload failed");
      }
      
      // Wait longer for the backend to initialize processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Now show the stream
      setShowStream(true);
      
    } catch (err) {
      console.error("Detection failed:", err);
      setError(`Detection failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock function to simulate receiving notifications from the server
  // In a real app, this would be a WebSocket connection
  useEffect(() => {
    if (showStream) {
      const mockNotificationInterval = setInterval(() => {
        // This is a placeholder. In a real implementation, you would 
        // receive actual notifications from your backend
      }, 5000);
      
      return () => clearInterval(mockNotificationInterval);
    }
  }, [showStream]);

  // Function to add a notification (this would be triggered by WebSocket in a real app)
  const addNotification = (notification) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      ...notification
    }]);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-4">Smarter Roads Start Here</h1>
      <p className="text-gray-300 mb-6">Upload video and detect potholes frame-by-frame in real time</p>

      {error && <div className="text-red-500 mb-4 font-semibold">{error}</div>}

      {/* Location Status */}
      <div className="mb-6 bg-secondary/50 p-4 rounded-lg flex items-center">
        <MapPin className="text-blue-500 mr-2" />
        <div>
          <p className="text-white text-sm">
            Status: <span className={location.status === "Tracking" ? "text-green-400" : "text-yellow-400"}>
              {location.status}
            </span>
          </p>
          {location.latitude && location.longitude && (
            <p className="text-gray-300 text-xs mt-1">
              Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
          )}
          <p className="text-gray-300 text-xs mt-1">{location.address}</p>
        </div>
        <button 
          onClick={requestLocationPermission} 
          className="ml-auto bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div 
          className="p-6 bg-secondary rounded-lg border-2 border-dashed border-gray-600 cursor-pointer hover:bg-secondary/80"
          onClick={handleUploadClick}
        >
          {/* Hidden file input */}
          <input 
            type="file" 
            ref={fileInputRef}
            accept="video/mp4" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          
          <Upload className="w-10 h-10 text-blue-500 mx-auto my-2" />
          <p className="text-center text-white">
            {selectedFile ? `Selected: ${selectedFile.name}` : "Upload MP4 file"}
          </p>
        </div>

        <div className="p-6 bg-secondary rounded-lg text-center">
          <Camera className="w-10 h-10 text-blue-500 mx-auto mb-2" />
          <button
            onClick={handleStartDetection}
            className={`mt-2 px-6 py-2 rounded-lg text-white font-semibold ${
              isProcessing ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Start Detection"}
          </button>
        </div>
      </div>

      {/* Notification settings toggle */}
      <div className="mb-6">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <Settings className="w-4 h-4 mr-1" />
          {showSettings ? "Hide Notification Settings" : "Configure Notification Settings"}
        </button>
        
        {showSettings && (
          <div className="mt-3 p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center mb-3">
              <Mail className="text-gray-400 mr-2 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for notifications"
                className="bg-secondary text-white px-3 py-2 rounded flex-1"
              />
            </div>
            <p className="text-gray-400 text-xs">
              Email notifications will be sent when potholes are detected. Configure email settings in your backend.
            </p>
          </div>
        )}
      </div>

      {/* MJPEG Stream Display */}
      {showStream && (
        <div className="mt-8 bg-secondary p-4 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-2">Live Processed Video:</h3>
          <img
            src="http://localhost:8000/stream"
            alt="Live Detection Stream"
            className="w-full max-h-[400px] object-contain rounded-lg border border-gray-700"
          />
        </div>
      )}

      {/* Notifications Log */}
      {notifications.length > 0 && (
        <div className="mt-6 bg-secondary/30 p-4 rounded-lg">
          <h3 className="text-white text-lg font-semibold mb-2">Detection Notifications:</h3>
          <div className="max-h-48 overflow-y-auto">
            {notifications.map(notification => (
              <div key={notification.id} className="bg-secondary/50 p-2 mb-2 rounded">
                <p className="text-white text-sm">
                  <span className="text-blue-400">[{notification.time}]</span> Pothole detected! 
                  {notification.confidence && ` Confidence: ${(notification.confidence * 100).toFixed(1)}%`}
                </p>
                <p className="text-gray-400 text-xs">{notification.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Download Link */}
      {showStream && (
        <div className="mt-6">
          <a
            href="http://localhost:8000/video/latest"
            className="text-blue-400 hover:text-blue-300 font-semibold underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⬇️ Download Final Processed Video
          </a>
        </div>
      )}
      
    </div>
  );
}

export default Home;