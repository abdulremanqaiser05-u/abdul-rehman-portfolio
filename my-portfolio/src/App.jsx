import { useEffect, useState, useRef } from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    title: "NOVA — Premium Store",
    category: "E-Commerce",
    tech: "HTML · CSS · JavaScript",
    video: "/videos/project-01.mp4",
  },
  {
    number: "02",
    title: "Helix — Nothing Here Stands Stil",
    category: "Interactive Experience",
    tech: "HTML • CSS • JavaScript • Canvas",
    video: "/videos/project-02.mp4",
  },
  {
    number: "03",
    title: "PLUME — Gilded Reading Room",
    category: "Interactive Reading Experience",
    tech: "HTML • CSS • JavaScript",
    video: "/videos/project-08.mp4",
  },
  {
    number: "04",
    title: "NOIR BREW — Artisan Coffee Experience",
    category: "Coffee • Café",
    tech: "HTML • CSS • JavaScript",
    video: "/videos/project-07.mp4",
  },
  {
    number: "05",
    title: "SPIDER — Cursor Experiment",
    category: "Interactive Experiment",
    tech: "HTML • CSS • JavaScript",
    video: "/videos/project-03.mp4",
  },
  {
    number: "06",
    title: "ATMOS — Weather Dashboard",
    category: "Weather • Web App",
    tech: "HTML • CSS • JavaScript • API",
    video: "/videos/project-06.mp4",
  },
  {
    number: "07",
    title: "3D Image Sphere — Interactive Photo Globe",
    category: "3D • Interactive Gallery",
    tech: "HTML • CSS • JavaScript • 3D Transforms",
    video: "/videos/project-04.mp4",
  },
  {
    number: "08",
    title: "AR Rentals — Luxury Car Rental",
    category: "Automotive • Rental",
    tech: "HTML • CSS • JavaScript • Animations",
    video: "/videos/project-05.mp4",
  },
  {
    number: "09",
    title: "REPTILE — Procedural Interactive Cursor",
    category: "Interactive • Creative Web Animation",
    tech: "HTML • CSS • JavaScript • Canvas • Procedural IK",
    video: "/videos/project-09.mp4",
  },
  {
    number: "10",
    title: "LIVE MAP — Real-Time Navigation",
    category: "Maps • Navigation",
    tech: "React • JavaScript • CSS • Maps API",
    video: "/videos/project-10.mp4",
  },
];

const skills = [
  {
    number: "01",
    title: "HTML",
    status: "Solid",
    type: "Development",
  },
  {
    number: "02",
    title: "CSS",
    status: "Solid",
    type: "Development",
  },
  {
    number: "03",
    title: "JavaScript",
    status: "Comfortable",
    type: "Development",
  },
  {
    number: "04",
    title: "React",
    status: "Learning",
    type: "Learning",
  },
  {
    number: "05",
    title: "Tailwind CSS",
    status: "Learning",
    type: "Learning",
  },
  {
    number: "06",
    title: "Figma",
    status: "UI & Prototyping",
    type: "Design",
  },
  {
    number: "07",
    title: "Canva",
    status: "Visual Design",
    type: "Design",
  },
  {
    number: "08",
    title: "VS Code",
    status: "Daily driver",
    type: "Tool",
  },
  
];

function App() {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const rootRef = useRef(null);

  // PROJECT TRAIN
  const projectWindowRef = useRef(null);
  const projectTrackRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const currentOffset = useRef(0);

  const animationFrame = useRef(null);

  const manualDir = useRef(0);
  const isPaused = useRef(false);

  // =====================================================
  // LOADING
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // =====================================================
  // CURSOR
  // =====================================================

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursor({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  // =====================================================
  // ESCAPE
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // =====================================================
  // PREVENT BODY SCROLL WHEN VIEWER IS OPEN
  // =====================================================

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // =====================================================
  // REVEAL
  // =====================================================

  useEffect(() => {
    const revealEls =
      rootRef.current?.querySelectorAll(
        ".reveal"
      );

    if (
      !revealEls ||
      revealEls.length === 0
    ) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "in-view"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px",
        }
      );

    revealEls.forEach((el) =>
      observer.observe(el)
    );

    return () =>
      observer.disconnect();
  }, []);

  // =====================================================
  // TRAIN HELPERS
  // =====================================================

  const normalizeOffset = () => {
    const track =
      projectTrackRef.current;

    if (!track) return;

    const oneSetWidth =
      track.scrollWidth / 2;

    if (!oneSetWidth) return;

    if (
      currentOffset.current >
      0
    ) {
      currentOffset.current -=
        oneSetWidth;

      startOffset.current -=
        oneSetWidth;
    }

    if (
      Math.abs(
        currentOffset.current
      ) >= oneSetWidth
    ) {
      currentOffset.current +=
        oneSetWidth;

      startOffset.current +=
        oneSetWidth;
    }
  };

  const applyOffset = () => {
    const track =
      projectTrackRef.current;

    if (!track) return;

    track.style.transform =
      `translate3d(${currentOffset.current}px, 0, 0)`;
  };

  // =====================================================
  // AUTO TRAIN
  // =====================================================

  useEffect(() => {
    const track =
      projectTrackRef.current;

    if (!track) return;

    let lastTime =
      performance.now();

    const moveTrain = (time) => {
      const delta =
        time - lastTime;

      lastTime = time;

      if (!isDragging.current) {
        if (
          manualDir.current !== 0
        ) {
          currentOffset.current +=
            manualDir.current *
            delta *
            0.55;
        } else if (
          !isPaused.current
        ) {
          currentOffset.current -=
            delta * 0.035;
        }

        normalizeOffset();
        applyOffset();
      }

      animationFrame.current =
        requestAnimationFrame(
          moveTrain
        );
    };

    animationFrame.current =
      requestAnimationFrame(
        moveTrain
      );

    return () => {
      cancelAnimationFrame(
        animationFrame.current
      );
    };
  }, []);

  // =====================================================
  // BUTTON CONTROLS
  // =====================================================

  const stepTrain = (dir) => {
    const track =
      projectTrackRef.current;

    if (!track) return;

    const card =
      track.querySelector(
        ".project"
      );

    const gap = 18;

    const step = card
      ? card.getBoundingClientRect()
          .width + gap
      : 318;

    currentOffset.current +=
      dir * step;

    normalizeOffset();

    track.style.transition =
      "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";

    applyOffset();

    window.setTimeout(() => {
      if (
        projectTrackRef.current
      ) {
        projectTrackRef.current.style.transition =
          "";
      }
    }, 680);
  };

  const startHold = (dir) => {
    manualDir.current = dir;

    if (
      projectTrackRef.current
    ) {
      projectTrackRef.current.style.transition =
        "";
    }
  };

  const stopHold = () => {
    manualDir.current = 0;
  };

  // =====================================================
  // DRAG / SWIPE
  // =====================================================

  const handleTrainPointerDown =
    (event) => {
      if (
        event.target.closest(
          ".train-btn"
        )
      ) {
        return;
      }

      if (
        event.target.closest(
          ".project-click-area"
        )
      ) {
        return;
      }

      isDragging.current = true;

      startX.current =
        event.clientX;

      startOffset.current =
        currentOffset.current;

      if (
        projectTrackRef.current
      ) {
        projectTrackRef.current.style.transition =
          "";
      }

      projectWindowRef.current?.setPointerCapture(
        event.pointerId
      );

      projectWindowRef.current?.classList.add(
        "is-dragging"
      );
    };

  const handleTrainPointerMove =
    (event) => {
      if (!isDragging.current)
        return;

      const distance =
        event.clientX -
        startX.current;

      currentOffset.current =
        startOffset.current +
        distance;

      normalizeOffset();
      applyOffset();
    };

  const handleTrainPointerUp =
    (event) => {
      isDragging.current =
        false;

      projectWindowRef.current?.releasePointerCapture?.(
        event.pointerId
      );

      projectWindowRef.current?.classList.remove(
        "is-dragging"
      );
    };

  // =====================================================
  // PROJECT VIEWER
  // =====================================================

  const openProject = (
    project
  ) => {
    isPaused.current = true;
    setSelectedProject(
      project
    );
  };

  const closeProject = () => {
    setSelectedProject(null);
    isPaused.current = false;
  };

  return (
    <>
      {/* =================================================
          LOADING SCREEN
      ================================================= */}

      <div
        className={`loading-screen ${
          loading
            ? "loading-active"
            : "loading-done"
        }`}
      >
        <div className="loader-content">
          <div className="loader-logo">
            AR
          </div>

          <div className="loader-name">
            Abdul Rehman
          </div>

          <div className="loader-line">
            <span />
          </div>

          <div className="loader-text">
            PORTFOLIO / 2026
          </div>
        </div>
      </div>

      <div
        className="site"
        ref={rootRef}
      >
        {/* CURSOR */}

        <div
          className="cursor-light"
          style={{
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
          }}
        />

        {/* BACKGROUND */}

        <div className="ambient-background">
          <span className="particle p1" />
          <span className="particle p2" />
          <span className="particle p3" />
          <span className="particle p4" />
          <span className="particle p5" />
          <span className="particle p6" />
          <span className="particle p7" />
          <span className="particle p8" />
          <span className="particle p9" />
          <span className="particle p10" />
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <header className="navbar">
          <a
            href="#top"
            className="logo"
          >
            <span>AR</span>
            Abdul Rehman
          </a>

          <nav>
            <a href="#about">
              About
            </a>

            <a href="#work">
              Work
            </a>

            <a href="#skills">
              Skills
            </a>

            <a href="#contact">
              Contact
            </a>
          </nav>

          <div className="nav-status">
            <span />
            Open to work
          </div>
        </header>

       {/* =================================================
    HERO
================================================= */}

<section
  className="hero"
  id="top"
>

  <div className="hero-top">

    <span>
      PORTFOLIO / 2026
    </span>

    <span>
      FRONTEND
    </span>

  </div>


  <div className="hero-content">

    {/* ===============================
        LEFT — INTRO / NAME
    =============================== */}

    <div className="hero-main">

      <p className="eyebrow">
        HELLO, I'M
      </p>


      <div className="hero-title-wrap">

        <h1>

          <span className="hero-name-white">
            Abdul
          </span>

          <span className="hero-name-grey">
            Rehman.
          </span>

        </h1>

      </div>


      <div className="hero-role-line">

        <span className="hero-role-marker">
          ✦
        </span>

        <span>
          FRONTEND DEVELOPER
        </span>

      </div>


      <p className="hero-description">

        I build responsive websites
        and interactive experiences
        with a focus on clean design,
        smooth motion and usability.

      </p>


      <a
        href="#work"
        className="hero-link"
      >

        <span>
          SEE THE WORK
        </span>

        <span className="hero-link-arrow">
          ↗
        </span>

      </a>

    </div>


    {/* ===============================
        RIGHT — 3D AR CUBE
    =============================== */}

    <div className="hero-visual">

      <div className="cube-scene">

        <div className="cube">

          {/* FRONT */}

          <div className="cube-face cube-front">

            <span>THINK</span><br />
                       <span>MAKE</span><br />
            <span>REFINE</span><br />

          </div>


          {/* RIGHT */}

          <div className="cube-face cube-right">

            <span>CREATE</span><br />
            <span>BUILD</span><br />
            <span>SHIP</span>
           

          </div>


          {/* LEFT */}

          <div className="cube-face cube-left">

            <span>AR</span>
            <span>2026</span>
            <span>WEB</span>
           

          </div>


          {/* TOP */}

          <div className="cube-face cube-top">

            <span>NEW</span><br />
            <span>idea?</span><br />
            <span>Drop </span>
            <span>it</span><br />

          </div>


          {/* BOTTOM */}

          <div className="cube-face cube-bottom">

            <span>WEB</span>
            <span>01</span>
            <span>WEB</span>
            <span>01</span>

          </div>


          {/* BACK */}

          <div className="cube-face cube-back">

            <span>AR</span>
            <span>AR</span>
            <span>AR</span>
            <span>AR</span>

          </div>

        </div>

      </div>


      <div className="cube-caption">

        <span>
          PERSONAL MARK
        </span>

        <span>
          AR / 01
        </span>

      </div>

    </div>

  </div>


  <div className="hero-bottom">

    <span>
      HTML / CSS / JS
    </span>

    <span>
      AVAILABLE FOR WORK
    </span>

    <span>
      SCROLL ↓
    </span>

  </div>

</section>
        {/* =================================================
    ABOUT
================================================= */}

<section
  className="section about reveal"
  id="about"
>
  <div className="section-label">
    <span>01</span>
    ABOUT
  </div>

  <div className="about-grid">

    {/* LEFT */}
    <div className="about-heading">

      <h2>
        I turn{" "}
        <em>ideas</em>
        <br />
        into screens.
      </h2>

      <div className="about-line"></div>

      <p className="about-intro">
        Designing and building digital experiences
        that feel simple, responsive and intentional.
      </p>

    </div>


    {/* CENTER VISUAL */}
    <div className="about-visual">

      <div className="visual-orbit orbit-one"></div>
      <div className="visual-orbit orbit-two"></div>

      <div className="visual-core">
        <span>AR</span>
      </div>

      <div className="visual-dot dot-one"></div>
      <div className="visual-dot dot-two"></div>
      <div className="visual-dot dot-three"></div>

    </div>


    {/* RIGHT */}
    <div className="about-text">

      <p className="lead">
        I'm Abdul Rehman....I build websites that try to
        look clean and feel responsive. Not
        inventing the next big framework —
        just making solid, usable interfaces.
      </p>

      <p>
        Mostly HTML, CSS and JavaScript right now.
        React and Tailwind are next on the list.
        I learn fastest by actually building stuff
        and breaking it until it works.
      </p>

      <div className="about-meta">

        <div>
          <small>FOCUS</small>
          <strong>Frontend</strong>
        </div>

        <div>
          <small>METHOD</small>
          <strong>Build · Break · Fix</strong>
        </div>

      </div>

    </div>

  </div>


  {/* BOTTOM INFO */}

  <div className="about-bottom">

    <span>
      <small>BASED IN</small>
      PAKISTAN
    </span>

    <span>
      <small>STACK</small>
      HTML · CSS · JS · REACT
    </span>

    <span>
      <small>STATUS</small>
      AVAILABLE FOR WORK
    </span>

    <span className="scroll-hint">
      SCROLL TO EXPLORE ↓
    </span>

  </div>

</section>
        {/* =================================================
            WORK
        ================================================= */}

        <section
          className="section work reveal"
          id="work"
        >
          <div className="section-label">
            <span>02</span>
            SELECTED WORK
          </div>

          <div className="work-heading">
            <div>
              <p className="eyebrow">
                A FEW THINGS
              </p>

              <h2>
                I've{" "}
                <em>made.</em>
              </h2>
            </div>

            <p>
              Sites, interfaces and
              <br />
              experiments from the
              <br />
              last couple of years.
            </p>
          </div>

          {/* =================================================
              PROJECT TRAIN
          ================================================= */}

          <div className="project-window-wrap">
            <button
              type="button"
              className="train-btn train-btn-prev"
              aria-label="Move train backward"
              onClick={() =>
                stepTrain(1)
              }
              onPointerDown={() =>
                startHold(1)
              }
              onPointerUp={
                stopHold
              }
              onPointerLeave={
                stopHold
              }
              onPointerCancel={
                stopHold
              }
            >
              ‹
            </button>

            <div
              className="project-window"
              ref={
                projectWindowRef
              }
              onPointerDown={
                handleTrainPointerDown
              }
              onPointerMove={
                handleTrainPointerMove
              }
              onPointerUp={
                handleTrainPointerUp
              }
              onPointerCancel={
                handleTrainPointerUp
              }
              onPointerLeave={() => {
                if (
                  isDragging.current
                ) {
                  isDragging.current =
                    false;

                  projectWindowRef.current?.classList.remove(
                    "is-dragging"
                  );
                }
              }}
            >
              <div
                className="project-track"
                ref={
                  projectTrackRef
                }
              >
                {[...projects, ...projects].map(
                  (
                    project,
                    index
                  ) => (
                    <article
                      className="project"
                      key={`${project.number}-${index}`}
                      onMouseEnter={() => {
                        isPaused.current =
                          true;
                      }}
                      onMouseLeave={() => {
                        isPaused.current =
                          false;
                      }}
                      onTouchStart={() => {
                        isPaused.current =
                          true;
                      }}
                      onTouchEnd={() => {
                        isPaused.current =
                          false;
                      }}
                    >
                      <div className="project-video">
                        <video
                          src={
                            project.video
                          }
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          disablePictureInPicture
                        />

                        <button
                          type="button"
                          className="project-click-area"
                          aria-label={`Open ${project.title}`}
                          onClick={() =>
                            openProject(
                              project
                            )
                          }
                        />

                        <div className="project-overlay">
                          <span>
                            VIEW PROJECT
                          </span>

                          <b>
                            ↗
                          </b>
                        </div>

                        <div className="project-index">
                          {
                            project.number
                          }
                        </div>
                      </div>

                      <div className="project-info">
                        <div>
                          <small>
                            {
                              project.category
                            }
                          </small>

                          <h3>
                            {
                              project.title
                            }
                          </h3>

                          <p>
                            {
                              project.tech
                            }
                          </p>
                        </div>

                        <button
                          type="button"
                          className="project-arrow"
                          aria-label={`Open ${project.title}`}
                          onClick={() =>
                            openProject(
                              project
                            )
                          }
                        >
                          ↗
                        </button>
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>

            <button
              type="button"
              className="train-btn train-btn-next"
              aria-label="Move train forward"
              onClick={() =>
                stepTrain(-1)
              }
              onPointerDown={() =>
                startHold(-1)
              }
              onPointerUp={
                stopHold
              }
              onPointerLeave={
                stopHold
              }
              onPointerCancel={
                stopHold
              }
            >
              ›
            </button>
          </div>

          <div className="work-note">
            <span>
              10 PROJECTS
            </span>

            <span>
              DRAG OR USE ARROWS ·
              CLICK TO VIEW
            </span>
          </div>
        </section>

        {/* =================================================
            SKILLS
        ================================================= */}

        <section
          className="section skills reveal"
          id="skills"
        >
          <div className="section-label">
            <span>03</span>
            TOOLKIT
          </div>

          <div className="skills-heading">
            <p className="eyebrow">
              WHAT I USE
            </p>

            <h2>
              Tools
              <br />
              <em>
                &amp; learning.
              </em>
            </h2>
          </div>

          <div className="skills-list">
            {skills.map(
              (skill) => (
                <div
                  className="skill"
                  key={
                    skill.number
                  }
                >
                  <div className="skill-number">
                    {
                      skill.number
                    }
                  </div>

                  <h3>
                    {
                      skill.title
                    }
                  </h3>

                  <div className="skill-type">
                    {
                      skill.type
                    }
                  </div>

                  <p>
                    {
                      skill.status
                    }
                  </p>

                  <div className="skill-symbol">
                    +
                  </div>
                </div>
              )
            )}
          </div>

          <p className="learning-note">
            * React and Tailwind
            are still in progress.
          </p>
        </section>
{/* =================================================
    CONTACT
================================================= */}

<section
  className="section contact reveal"
  id="contact"
>
  <div className="section-label">
    <span>04</span>
    CONTACT
  </div>

  <div className="contact-layout">

    {/* LEFT SIDE */}
    <div className="contact-intro">

      <p className="eyebrow">
        LET'S CONNECT
      </p>

      <h2>
        Let's build
        <br />
        <em>something solid.</em>
      </h2>

      <p className="contact-description">
        Have an idea, project, or opportunity?
        I'm always open to discussing new work
        and building something useful together.
      </p>

      <a
        href="mailto:abdulremanqaiser05@gmail.com"
        className="contact-button"
      >
        Send a Message
        <span>↗</span>
      </a>

    </div>


    {/* RIGHT SIDE */}
    <div className="contact-grid">

    {/* EMAIL */}
<a
  href="mailto:abdulremanqaiser05@gmail.com"
  className="contact-card"
>
  <div className="contact-card-icon">
    ✉
  </div>

  <div
    className="contact-card-info"
    style={{
      minWidth: 0,
      flex: 1,
    }}
  >
    <small>EMAIL</small>

    <strong
      style={{
        display: "block",
        maxWidth: "100%",
        whiteSpace: "normal",
        wordBreak: "normal",
        overflowWrap: "break-word",
      }}
    >
      abdulremanqaiser05@gmail.com
    </strong>

    <span>
      Get in touch
    </span>
  </div>

  <b>↗</b>
</a>


{/* PHONE */}
<a
  href="tel:+923326948600"
  className="contact-card"
>
  <div className="contact-card-icon phone-icon">
    ♧
  </div>

  <div
    className="contact-card-info"
    style={{
      minWidth: 0,
      flex: 1,
    }}
  >
    <small>PHONE</small>

    <strong
      style={{
        display: "block",
        maxWidth: "100%",
        whiteSpace: "normal",
        wordBreak: "normal",
        overflowWrap: "break-word",
      }}
    >
      +92 332 6948600
    </strong>

    <span>
      Available for calls
    </span>
  </div>

  <b>↗</b>
</a>
     {/* LINKEDIN */}
<a
  href="https://www.linkedin.com/in/abdulrehman-qaiser-996468285"
  target="_blank"
  rel="noreferrer"
  className="cv-card"
>
  <div className="contact-card-info">
    <small>LINKEDIN</small>

    <strong>
      Let's connect
    </strong>

    <span>
      Professional network
    </span>
  </div>

  <b>↗</b>
</a>

     {/* CV */}
<a
  href="/cv.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="cv-card"
>
  <div className="contact-card-info">
  <small>MY CV</small>

  <strong>
    View my CV
  </strong>

  <span>
    Curriculum Vitae
  </span>
   
</div>
 <b>↗</b>
</a>

    </div>

  </div>
</section>
        {/* =================================================
            FOOTER
        ================================================= */}

        <footer>
          <div>
            © Abdul Rehman
          </div>

          <div>
            Built from scratch. Crafted with intention.
          </div>

          <div className="footer-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </footer>
      </div>

      {/* =================================================
          FULLSCREEN PROJECT VIEWER
      ================================================= */}

      {selectedProject && (
        <div
          className="project-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} project viewer`}
          onClick={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeProject();
            }
          }}
        >
          <div className="viewer-top">
            <div className="viewer-number">
              PROJECT /{" "}
              {
                selectedProject.number
              }
            </div>

            <button
              type="button"
              className="viewer-close"
              onClick={
                closeProject
              }
              aria-label="Close project viewer"
            >
              ×
            </button>
          </div>

          <div className="viewer-content">
            <div className="viewer-video-wrap">
              <video
                className="viewer-video"
                src={
                  selectedProject.video
                }
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="auto"
              />
            </div>

            <div className="viewer-info">
              <div>
                <div className="viewer-category">
                  {
                    selectedProject.category
                  }
                </div>

                <h2>
                  {
                    selectedProject.title
                  }
                </h2>

                <div className="viewer-tech">
                  {
                    selectedProject.tech
                  }
                </div>
              </div>

              <div className="viewer-hint">
                ESC TO CLOSE ·
                CLICK OUTSIDE TO CLOSE
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;