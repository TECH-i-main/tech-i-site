(function () {
  "use strict";

  // tsParticles を初期化
  async function initParticles() {
    try {
      // JSONファイルから設定を読み込む
      const response = await fetch("particles.json");
      const particlesConfig = await response.json();

      // tsParticles を初期化
      await tsParticles.load("particles-container", particlesConfig);

      console.log("Particles initialized successfully");
    } catch (error) {
      console.error("Error initializing particles:", error);
    }
  }

  // DOM が読み込まれたら実行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initParticles);
  } else {
    initParticles();
  }
})();
