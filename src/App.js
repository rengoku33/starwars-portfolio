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
  const [starSpeed, setStarSpeed] = useState(3);
  const starSpeedRef = useRef(starSpeed);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId;
    const stars = [];
    const STAR_COUNT = 333;
    // const STAR_SPEED = 5;
    const MAX_DEPTH = 1200;
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

    starSpeedRef.current = starSpeed;
    const moveStars = () => {
      stars.forEach((star) => {
        star.prevZ = star.z;
        star.z = star.z - starSpeedRef.current;
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
  }, [starSpeed]);
  // Project data
  const projects = [
    {
      id: 1,
      title: "Thrift Shop",
      category: "Ecommerce",
      description:
        "An ecommerce platform for clothing.",
      image:
        thriftshop,
      github: "https://github.com/rengoku33/ThriftShop",
      demo: "https://the-thrift-shop.netlify.app/"
    },
    {
      id: 2,
      title: "Imageify",
      category: "AI",
      description: "An AI image generator",
      image:
        imageify,
      github: "https://github.com/rengoku33/cine-img-gen-frontend",
      demo: "https://imagify-frontend-sage.vercel.app/"
    },
    {
      id: 3,
      title: "Celestial Cast",
      category: "App",
      description: "A Weather app with SSG",
      image:
        celestial,
      github: "https://github.com/rengoku33/Celestial-Cast",
      demo: "https://celestial-cast.vercel.app/"
    },
    {
      id: 4,
      title: "Witcher's Vault",
      category: "App",
      description: "Inventory management application",
      image:
        witcher,
      github: "https://github.com/rengoku33/witcher-alchemy",
      demo: "https://github.com/rengoku33/witcher-alchemy/blob/main/README.md"
    },
    {
      id: 5,
      title: "Portfolio Page",
      category: "Landing pages",
      description: "A portfolio based website",
      image:
        port,
      github: "https://github.com/rengoku33/Portfolio",
      demo: "https://kiran-vignesh-portfolio.netlify.app/"
    },
  ];
  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.category === activeTab);
  return (
    <div className="relative min-h-screen text-white font-sans mt-5">
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
                href="https://www.linkedin.com/in/kiran-vignesh-61339a225/"
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
          <div className="bg-transparent backdrop-blur-sm rounded-2xl border border-white p-8 w-full md:w-2/3">
            <div className="mb-4">
              <p className="text-gray-400">
                Fuel’s full, vibes are stellar. Punch it <span className="text-yellow-400">🚀</span>
              </p>
              <div className="flex items-center gap-4 mb-4">
                <label htmlFor="speed" className="text-white">Spaceship Speed:</label>
                <input
                  id="speed"
                  type="range"
                  min="1"
                  max="100"
                  value={starSpeed}
                  onChange={(e) => setStarSpeed(Number(e.target.value))}
                  className="w-48"
                />
                <span className="text-white">{starSpeed * 100} mph</span>
              </div>


              <h2 className="text-3xl font-normal mb-2">
                I'm Kiran,{" "}
                <span className="text-gray-400">
                  a Software Engineer with experience over multiple frameworks and languages. I build robust
                  products that deliver exceptional user experiences with seamless integrations.
                </span>
              </h2>
            </div>
            <div className="mb-12 mt-12">
              <p className="text-gray-400 mb-3">
                Products I have contributed to:
              </p>
              <div className="flex space-x-6">
                <div className="text-white font-bold border-[7px] border-white rounded-3xl">
                  {/* <i className="fas fa-arrow-right mr-2"></i>LONGSHOT */}
                  <img src={intellect} width="160" className="rounded-xl" alt="intellect" />
                </div>
                <div className="text-white font-bold border-[10px] border-white rounded-3xl">
                  {/* <i className="fas fa-info-circle mr-2"></i>INFO */}
                  <img src={catalyst} width="160" className="rounded-xl " alt="catalyst" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-7">
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
        <div className="bg-transparent backdrop-blur-sm rounded-2xl border border-white p-8 mb-16">
          <h2 className="text-5xl font-medium mb-2 text-center">Projects</h2>
          <p className="text-gray-400 mb-8 text-center mt-5">
            Some of my personal projects built with passion and dedication
          </p>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-800 pb-4 justify-center rounded-xl">
            {["All", "App", "Ecommerce", "Landing pages", "AI"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-button cursor-pointer transition-colors whitespace-nowrap ${activeTab === tab
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
                className="group relative bg-transparent backdrop-blur-sm rounded-xl border border-white overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              >
                {/* Image Container */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-all duration-300 group-hover:blur-sm"
                  />

                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      <i className="fab fa-github"></i>
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Project
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <span className="text-xs text-gray-400">{project.category}</span>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CTA Section */}
        <div className="bg-transparent backdrop-blur-sm rounded-2xl border border-white p-16 text-center mb-12">
          <h2 className="text-4xl font-normal mb-4">
            Ready to kickstart your project?
          </h2>
          <p className="text-gray-400 mb-1">
            Reach out and let's make it happen{" "}
            <span className="text-yellow-400">💥</span>
          </p>
          <p className="text-gray-400 mb-8">
            I'm also open to full-time or part-time opportunities.
          </p>
          <button className="bg-white text-black px-6 py-2 rounded-button inline-flex items-center cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap mx-auto rounded-xl ">
            <span>Let's Talk</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 py-4">
          <div>Copyright ©2025 All Rights Reserved.</div>
          <div className="flex items-center">
            Built with <i className="fas fa-heart text-red-500 mx-2"></i> Kiran Vignesh
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
