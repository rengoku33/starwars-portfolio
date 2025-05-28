// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from "react";
import avatar from "./assets/avatar.png"
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
    const STAR_COUNT = 800;
    const STAR_SPEED = 0.5;
    const MAX_DEPTH = 1500;
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
      title: "Scheduler",
      category: "App",
      description:
        "A simple plugable scheduling app for businesses. Like Calendly.",
      image:
        "https://readdy.ai/api/search-image?query=Modern%20sleek%20dark%20UI%20for%20a%20scheduling%20app%20with%20calendar%20interface%20and%20appointment%20booking%20features%2C%20professional%20design%20with%20purple%20and%20blue%20accents%20on%20black%20background%2C%20minimalist%20and%20clean%20layout&width=400&height=240&seq=1&orientation=landscape",
    },
    {
      id: 2,
      title: "Spreadsheet EX",
      category: "App",
      description: "A simple spreadsheet for quick edits",
      image:
        "https://readdy.ai/api/search-image?query=Clean%20modern%20spreadsheet%20application%20interface%20with%20cells%2C%20formulas%2C%20and%20data%20visualization%20tools%2C%20professional%20dark%20theme%20with%20subtle%20grid%20lines%20and%20minimal%20UI%20elements%2C%20tech%20product%20screenshot&width=400&height=240&seq=2&orientation=landscape",
    },
    {
      id: 3,
      title: "Clothing Store",
      category: "Ecommerce",
      description: "An ecommerce platform for clothing",
      image:
        "https://readdy.ai/api/search-image?query=Elegant%20fashion%20ecommerce%20website%20showcasing%20summer%20collection%2C%20models%20in%20stylish%20outfits%2C%20clean%20layout%20with%20product%20grid%2C%20dark%20theme%20with%20professional%20photography%2C%20luxury%20clothing%20brand%20interface&width=400&height=240&seq=3&orientation=landscape",
    },
    {
      id: 4,
      title: "3D NFT Landing Page",
      category: "Landing pages",
      description: "A 3D landing page for a NFT project",
      image:
        "https://readdy.ai/api/search-image?query=Futuristic%203D%20NFT%20marketplace%20landing%20page%20with%20galaxy%20theme%2C%20space%20elements%2C%20glowing%20digital%20art%20pieces%2C%20dark%20background%20with%20neon%20accents%2C%20professional%20crypto%20art%20platform%20interface&width=400&height=240&seq=4&orientation=landscape",
    },
    {
      id: 5,
      title: "Digital Marketing agency website",
      category: "Landing pages",
      description: "A website for a digital marketing agency",
      image:
        "https://readdy.ai/api/search-image?query=Professional%20digital%20marketing%20agency%20website%20with%20data%20visualization%2C%20service%20offerings%2C%20team%20collaboration%20illustration%2C%20dark%20theme%20with%20orange%20and%20blue%20accents%2C%20business%20growth%20concept&width=400&height=240&seq=5&orientation=landscape",
    },
    {
      id: 6,
      title: "3D Art Gallery",
      category: "Misc",
      description: "A 3D art gallery prototype",
      image:
        "https://readdy.ai/api/search-image?query=Virtual%203D%20art%20gallery%20interface%20with%20digital%20artwork%20display%2C%20interactive%20exhibition%20space%2C%20modern%20UI%20with%20navigation%20controls%2C%20dark%20theme%20with%20spotlights%20on%20artwork%2C%20immersive%20viewing%20experience&width=400&height=240&seq=6&orientation=landscape",
    },
    {
      id: 7,
      title: "Chess Game",
      category: "Misc",
      description: "A 2 player chess game",
      image:
        "https://readdy.ai/api/search-image?query=Elegant%20chess%20game%20interface%20with%203D%20rendered%20chess%20pieces%20on%20a%20dark%20themed%20board%2C%20minimal%20UI%20with%20move%20history%20panel%2C%20professional%20gaming%20application%20with%20subtle%20blue%20highlights&width=400&height=240&seq=7&orientation=landscape",
    },
    {
      id: 8,
      title: "Spinning Wheel Offers Game",
      category: "Misc",
      description: "A spinning wheel offers game for customers in your website",
      image:
        "https://readdy.ai/api/search-image?query=Colorful%20spinning%20wheel%20game%20interface%20with%20prize%20segments%2C%20interactive%20promotional%20tool%20with%20entry%20form%2C%20engaging%20customer%20rewards%20system%2C%20mint%20green%20background%20with%20festive%20elements&width=400&height=240&seq=8&orientation=landscape",
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
          <div className="bg-transparent backdrop-blur-sm rounded-xl border border-white p-8 flex flex-col items-center w-full md:w-1/3">
            <div className="w-[63%]] h-[63%] mb-4">
              <img
                src={avatar}
                alt="Subham Mohanty"
                className="w-full h-full object-fit"
              />
            </div>
            <h1 className="text-2xl font-bold mb-1">Kiran Vignesh</h1>
            <p className="text-gray-400 mb-6">
              I am a Frontend Developer based in India.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="cursor-pointer text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="#"
                className="cursor-pointer text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="#"
                className="cursor-pointer text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          {/* Right Introduction Card */}
          <div className="bg-transparent backdrop-blur-sm rounded-xl border border-white p-8 w-full md:w-2/3">
            <div className="mb-4">
              <p className="text-gray-400">
                Hey There <span className="text-yellow-400">👋</span>
              </p>
              <h2 className="text-3xl font-bold mb-2">
                I'm Subham,{" "}
                <span className="text-gray-400">
                  a Frontend Developer with DevOps experience. I build robust
                  products that deliver exceptional user experiences.
                </span>
              </h2>
            </div>
            <div className="mb-8">
              <p className="text-gray-400 mb-2">
                Products I have contributed to:
              </p>
              <div className="flex space-x-6">
                <div className="text-white font-bold">
                  <i className="fas fa-arrow-right mr-2"></i>LONGSHOT
                </div>
                <div className="text-white font-bold">
                  <i className="fas fa-info-circle mr-2"></i>INFO
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black px-4 py-2 rounded-button flex items-center cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap">
                <span>Take Resume</span>
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
          <h2 className="text-3xl font-bold mb-2">Projects</h2>
          <p className="text-gray-400 mb-8">
            Check out some of my projects, built with love and dedication, each
            one reflecting attention to detail.
          </p>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-800 pb-4">
            {["All", "App", "Ecommerce", "Landing pages", "Misc"].map((tab) => (
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
