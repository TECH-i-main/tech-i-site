// TECH-i Website - Main JavaScript

// TECH-i サイト - メイン JavaScript
// 概要:
// - ブラウザ標準のスムーススクロール（scroll-behavior: smooth）を使用
// - Intersection Observer によるスクロールアニメーション制御
// - モバイルメニューや CTA のハンドリング等のインタラクションを管理
// - パフォーマンス最適化（デバウンス、画像の遅延読み込み等）を実装

(function () {
  "use strict";

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  // モバイルメニューの開閉制御
  // - ボタン押下でメニューを toggle
  // - メニュー内リンクを押したら自動で閉じる
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // ログ出力: デバッグ用
  console.log("Mobile menu button element:", mobileMenuBtn);
  console.log("Mobile menu element:", mobileMenu);

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Mobile menu button clicked");

      // Toggle the hidden class
      if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("show");
        console.log("Menu opened");
      } else {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("show");
        console.log("Menu closed");
      }
    });

    // Close menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");

        // Close the menu
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("show");
        console.log("Menu closed after link click");

        // Navigate to the section
        if (href && href !== "#") {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  } else {
    console.error("Mobile menu elements not found!");
    if (!mobileMenuBtn) console.error("mobileMenuBtn is null");
    if (!mobileMenu) console.error("mobileMenu is null");
  }

  // ============================================
  // Intersection Observer for Scroll Animations
  // ============================================
  // Intersection Observer: セクションのフェードイン制御
  // - セクションが画面に入ったら .animate-in を付与してアニメーション開始
  // - 一度表示した要素は observer.unobserve してパフォーマンスを改善
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply observer to all sections
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("section-animate");
    observer.observe(section);
  });

  // ============================================
  // Navigation Highlight on Scroll
  // ============================================
  // ナビゲーションのハイライト（スクロール位置に応じて現在のセクションを赤色表示）
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-red-500");
      link.classList.add("text-gray-300");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.remove("text-gray-300");
        link.classList.add("text-red-500");
      }
    });
  });

  // ============================================
  // Service Card Hover Animation
  // ============================================
  // サービスカードのホバー挙動（簡易アニメーション）
  // - マウスインで translateY(-8px)、マウスアウトで戻す
  const serviceCards = document.querySelectorAll('[class*="group"]');

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // ============================================
  // Scroll Counter for Stats (if needed)
  // ============================================
  // カウントアップ関数（統計表示などに利用可能）
  // - element: DOM 要素
  // - target: 最終値
  // - duration: 継続時間（ms）
  function countUp(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // ============================================
  // Parallax Scroll Effect (Subtle)
  // ============================================
  // パララックス（任意）: data-parallax 属性を付けた要素に対して適用
  // - data-parallax の値でスピードを調整
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  if (parallaxElements.length > 0) {
    window.addEventListener("scroll", () => {
      parallaxElements.forEach((element) => {
        const scrollPosition = window.pageYOffset;
        const speed = element.getAttribute("data-parallax") || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    });
  }

  // ============================================
  // Fade In On Load
  // ============================================
  // ウィンドウロード時のフェードイン補助
  window.addEventListener("load", () => {
    document.body.style.opacity = "1";
  });

  // ============================================
  // Performance: Lazy Load Images
  // ============================================
  // 画像の遅延読み込み（IntersectionObserver ベース）
  // - img 要素に data-src 属性を追加しておくと有効
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // Email CTA Click Handler (with tracking)
  // ============================================
  // メールリンククリック時の簡易トラッキング（解析導入時に拡張してください）
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Analytics tracking could be added here
      console.log("Contact email clicked");
    });
  });

  // ============================================
  // Smooth Page Transitions
  // ============================================
  // アンカーリンクのスムーススクロール処理
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        const element = document.querySelector(href);
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ============================================
  // Form Validation (if contact form added)
  // ============================================
  // フォームバリデーション（連絡フォームを追加した際に利用）
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Form submission handling
      console.log("Form submitted");
    });
  }

  // ============================================
  // Cookie/Theme Preferences (Optional)
  // ============================================
  // テーマ保存（ダーク/ライトなどのプリファレンス用、将来的に利用）
  function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
  initTheme();

  // ============================================
  // Performance Optimization
  // ============================================
  // パフォーマンス最適化: スクロールイベントのデバウンス
  // Debounce scroll events
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  // Use debounced scroll listener for performance
  const handleScroll = debounce(() => {
    // Scroll-based logic here
  }, 250);

  window.addEventListener("scroll", handleScroll);

  // ============================================
  // Window Resize Handler
  // ============================================
  // ウィンドウリサイズハンドラ（必要に応じて処理を追加）
  window.addEventListener(
    "resize",
    debounce(() => {
      // Handle resize events
    }, 250),
  );

  // ============================================
  // Keyboard Navigation
  // ============================================
  // キーボード操作補助（ESC でメニューを閉じる等）
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close any open menus
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("show");
        console.log("Menu closed by ESC key");
      }
    }
  });

  // ============================================
  // PWA Support (Optional)
  // ============================================
  if ("serviceWorker" in navigator) {
    // Service worker registration can be added here if needed
    // navigator.serviceWorker.register('sw.js');
  }

  // ============================================
  // Analytics (if needed)
  // ============================================
  function trackEvent(category, action, label) {
    if (window.gtag) {
      gtag("event", action, {
        event_category: category,
        event_label: label,
      });
    }
  }

  // Track page views
  trackEvent("pageview", "home", window.location.href);

  // ============================================
  // Initialization Complete
  // ============================================
  document.addEventListener("DOMContentLoaded", () => {
    console.log("TECH-i Website initialization complete");
  });
})();

// Export utilities for reuse
window.SiteUtils = {
  getElementPosition: function (element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
    };
  },

  isElementInViewport: function (element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  },
};
