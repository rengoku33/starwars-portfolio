// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from "react";
import avatar from "./assets/avatar.png"
import catalyst from "./assets/catalyst.png"
import intellect from "./assets/intellect.png"
import thriftshop from "./assets/thriftshop.webp"
import celestial from "./assets/celestial.webp"
import witcher from "./assets/witcher.webp"
import port from "./assets/port.webp"
import imageify from "./assets/imageify.webp"
// interface Star {
//   x: number;
//   y: number;
//   z: number;
//   prevZ: number;
// }
const App = () => {
  const [activeTab, setActiveTab] = useState("All");
const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    const stars = [];
    const STAR_COUNT = 900;
    const STAR_SPEED = 0.77;
    const MAX_DEPTH = 1000;
    const initStars = () => {
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * MAX_DEPTH,
          prevZ: 0,
        });
      }
    };
    const moveStars = () => {
      stars.forEach((star) => {
        star.prevZ = star.z;
        star.z = star.z - STAR_SPEED;
        if (star.z <= 1) {
          star.z = MAX_DEPTH;
          star.prevZ = MAX_DEPTH;
        }
      });
    };
    const drawStars = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      stars.forEach((star) => {
        const x = star.x / (star.z * 0.001);
        const y = star.y / (star.z * 0.001);
        const prevX = star.x / (star.prevZ * 0.001);
        const prevY = star.y / (star.prevZ * 0.001);
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = (1 - star.z / MAX_DEPTH) * 3;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
      ctx.restore();
    };
    const animate = () => {
      moveStars();
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0;
      initStars();
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
    animate();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  // Project data
  const projects = [
    {
      id: 1,
      title: "Thrift Shop",
      category: "Ecommerce",
      description:
        "An ecommerce platform for clothing.",
      image:
        thriftshop
    },
    {
      id: 2,
      title: "Imageify",
      category: "AI",
      description: "An AI image generator",
      image:
        imageify
    },
    {
      id: 3,
      title: "Celestial Cast",
      category: "App",
      description: "A Weather app with SSG",
      image:
        celestial
    },
    {
      id: 4,
      title: "Witcher's Vault",
      category: "App",
      description: "Inventory management application",
      image:
        witcher
    },
    {
      id: 5,
      title: "Portfolio Page",
      category: "Landing pages",
      description: "A portfolio based website",
      image:
        port
    },
  ];
  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.category === activeTab);
  return (
    <div className="relative min-h-screen text-white font-sans">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          {/* Left Profile Card */}
          <div className="bg-avatar-white rounded-2xl border border-white p-8 flex flex-col items-center w-full md:w-1/3">
            <div className="w-[90%] h-[90%] mb-3 mt-7">
              <img
                src={avatar}
                alt="Subham Mohanty"
                className="w-full h-full object-fit"
              />
            </div>
            <h1 className="text-4xl font-semibold mb-1 text-black">Kiran Vignesh</h1>
            <p className="text-black mb-5 mt-3">
              I am a Software Engineer based in India.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/rengoku33"
                className="cursor-pointer text-black hover:text-green-600 transition-colors pr-7"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="https://github.com/rengoku33"
                className="cursor-pointer text-black hover:text-green-600 transition-colors pr-7"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://github.com/rengoku33"
                className="cursor-pointer text-black hover:text-green-600 transition-colors"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          {/* Right Introduction Card */}
          <div className="bg-transparent backdrop-blur-sm rounded-xl border border-white p-8 w-full md:w-2/3">
            <div className="mb-4">
              <p className="text-gray-400">
                Hello There <span className="text-yellow-400">👋</span>
              </p>
              <h2 className="text-3xl font-normal mb-2">
                I'm Kiran,{" "}
                <span className="text-gray-400">
                  a Software Engineer with experience over multiple frameworks and languages. I build robust
                  products that deliver exceptional user experiences with seamless integrations.
                </span>
              </h2>
            </div>
            <div className="mb-12 mt-12">
              <p className="text-gray-400 mb-2">
                Products I have contributed to:
              </p>
              <div className="flex space-x-6">
                <div className="text-white font-bold border-[7px] border-white rounded-3xl">
                  {/* <i className="fas fa-arrow-right mr-2"></i>LONGSHOT */}
                  <img src={intellect} width="160" className="rounded-xl" alt="intellect"/>
                </div>
                <div className="text-white font-bold border-[10px] border-white rounded-3xl">
                  {/* <i className="fas fa-info-circle mr-2"></i>INFO */}
                  <img src={catalyst} width="160" className="rounded-xl " alt="catalyst"/>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-7 items-center">
              <button className="bg-white text-black px-7 py-2 rounded-button rounded-2xl flex items-center cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap">
                <span>See Resume</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
              <div className="flex items-center text-green-400 cursor-pointer">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                <span className="whitespace-nowrap">
                  Available for Freelancing
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Projects Section */}
        <div className="bg-transparent backdrop-blur-sm rounded-xl border border-white p-8 mb-16">
          <h2 className="text-5xl font-medium mb-2 text-center">Projects</h2>
          <p className="text-gray-400 mb-8 text-center mt-5">
            Some of my personal projects built with love and dedication
          </p>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-800 pb-4">
            {["All", "App", "Ecommerce", "Landing pages", "AI"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-button cursor-pointer transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-transparent backdrop-blur-sm rounded-xl border border-white overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-gray-400">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA Section */}
        <div className="bg-transparent backdrop-blur-sm rounded-xl border border-white p-8 text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to kickstart your project?
          </h2>
          <p className="text-gray-400 mb-6">
            Reach out and let's make it happen{" "}
            <span className="text-yellow-400">💥</span>
          </p>
          <p className="text-gray-400 mb-8">
            I'm also open to full-time or part-time opportunities.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-button inline-flex items-center cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap mx-auto">
            <span>Let's Talk</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 py-4">
          <div>Copyright ©2024 All Rights Reserved.</div>
          <div className="flex items-center">
            Built with <i className="fas fa-heart text-red-500 mx-2"></i> Subham
            Mohanty
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
