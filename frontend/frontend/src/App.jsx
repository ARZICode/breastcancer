import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// Data Structures
const SIGNS_DATA = [
  {
    id: 1,
    title: 'A new lump or thickening',
    summary: 'The most common first sign, though most breast lumps are not cancer.',
    more: 'A lump or area of thickening, often without pain, is the most common symptom. A hard, painless lump with uneven edges is more likely to be cancer, but cancerous lumps can also be soft, round, tender or painful. Because you can’t tell by touch, any new lump is worth having checked.',
  },
  {
    id: 2,
    title: 'A change in size, shape or look',
    summary: 'Swelling of all or part of a breast, even with no distinct lump.',
    more: 'Look for a change in the size, shape or appearance of a breast, or swelling in part of it. Breasts also change naturally with the menstrual cycle, pregnancy and menopause, so a professional can help tell normal variation from something new.',
  },
  {
    id: 3,
    title: 'Skin changes',
    summary: 'Dimpling, redness, dryness, flaking or thickening of the skin.',
    more: 'Skin on the breast that dimples (sometimes like the surface of an orange), turns red, or becomes dry, flaky or thickened should be looked at. These changes can also come from infection or irritation, which a professional can assess.',
  },
  {
    id: 4,
    title: 'Nipple changes',
    summary: 'A nipple turning inward, or redness or scaling around it.',
    more: 'A nipple that turns inward, or red, scaly or thickened skin on the nipple or the area around it, deserves attention. Nipple or breast pain can also occasionally be a symptom, and it has many other causes too.',
  },
  {
    id: 5,
    title: 'Unusual nipple discharge',
    summary: 'Fluid that isn’t breast milk, especially if it’s bloody.',
    more: 'Abnormal fluid from the nipple, particularly if it is bloody, should be checked. There are many non-cancer causes, but only an examination can tell them apart.',
  },
  {
    id: 6,
    title: 'Swelling near the armpit or collarbone',
    summary: 'Swollen lymph nodes can sometimes appear before a breast lump.',
    more: 'Swollen lymph nodes under the arm or near the collarbone can be a sign that breast cancer has spread to those nodes, even before a lump in the breast can be felt. Swollen nodes have many other causes, but report them too.',
  },
];

const FACTS_DATA = [
  {
    myth: '“Most breast lumps are cancer.”',
    fact: 'Most breast lumps are not cancer. A new lump should still be examined, because it can’t be diagnosed by touch alone.',
    linkText: 'WHO fact sheet',
    linkUrl: 'https://www.who.int/news-room/fact-sheets/detail/breast-cancer',
  },
  {
    myth: '“Only women get breast cancer.”',
    fact: 'Roughly 0.5–1% of breast cancers occur in men. It’s rare, but real, and men should report breast changes to a doctor too.',
    linkText: 'WHO fact sheet',
    linkUrl: 'https://www.who.int/news-room/fact-sheets/detail/breast-cancer',
  },
  {
    myth: '“Deodorant and antiperspirant cause breast cancer.”',
    fact: 'The US National Cancer Institute states that no scientific evidence links underarm antiperspirants or deodorants to the development of breast cancer.',
    linkText: 'National Cancer Institute',
    linkUrl: 'https://www.cancer.gov/about-cancer/causes-prevention/risk/myths/antiperspirants-fact-sheet',
  },
  {
    myth: '“Wearing an underwire bra causes breast cancer.”',
    fact: 'The American Cancer Society reports no scientific or clinical data showing that wearing a bra changes breast cancer risk, including a 2014 study of more than 1,500 women.',
    linkText: 'American Cancer Society',
    linkUrl: 'https://www.cancer.org/cancer/types/breast-cancer/risk-and-prevention/disproven-or-controversial-breast-cancer-risk-factors.html',
  },
  {
    myth: '“If it doesn’t run in my family, I’m not at risk.”',
    fact: 'Most women diagnosed with breast cancer have no known family history. Having none doesn’t mean your risk is low, and a family history is worth sharing with your doctor.',
    linkText: 'WHO fact sheet',
    linkUrl: 'https://www.who.int/news-room/fact-sheets/detail/breast-cancer',
  },
  {
    myth: '“If I feel fine, screening can wait.”',
    fact: 'Screening exists to find breast cancer before symptoms appear. It isn’t perfect and can miss cancers, so report any new change even after a normal result.',
    linkText: 'American Cancer Society',
    linkUrl: 'https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/american-cancer-society-recommendations-for-the-early-detection-of-breast-cancer.html',
  },
];

const GUIDANCE_TABS = [
  {
    id: 'who',
    label: 'WHO · global',
    content: 'WHO describes screening as mammography in an apparently healthy population, usually women aged 50–69. It also stresses that where mammography is not practical, early diagnosis, meaning awareness of symptoms and prompt evaluation, still matters.',
    linkText: 'WHO breast cancer fact sheet',
    linkUrl: 'https://www.who.int/news-room/fact-sheets/detail/breast-cancer',
  },
  {
    id: 'acs',
    label: 'American Cancer Society',
    content: 'For women at average risk, the ACS says those aged 40–44 can choose to start yearly mammograms, those 45–54 should have them yearly, and from 55 they can switch to every other year or continue yearly. Women at higher risk, for example with a known BRCA gene change or chest radiation before age 30, may need MRI plus mammography, usually from age 30. The decision should be made with a healthcare provider.',
    linkText: 'ACS screening guidelines',
    linkUrl: 'https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/american-cancer-society-recommendations-for-the-early-detection-of-breast-cancer.html',
  },
  {
    id: 'lb',
    label: 'Lebanon · MoPH',
    content: 'Lebanon’s Ministry of Public Health runs an annual national awareness and early-detection campaign. Its 2026 campaign states that mammography is available in all government hospitals throughout the year for Lebanese women over 40, and lists participating government and private hospitals. The ministry’s information line for radiology centres is 1214. Check the MoPH page for current eligibility and details.',
    linkText: 'MoPH National Breast Cancer Awareness Campaign 2026',
    linkUrl: 'https://www.moph.gov.lb/en/Pages/11/87130',
  },
];

const STEPS_DATA = [
  { title: 'Learn your normal', desc: 'Get familiar with how your breasts usually look and feel, so changes stand out.' },
  { title: 'Report changes', desc: 'See a healthcare professional about any new lump, skin or nipple change, or discharge.' },
  { title: 'Ask about screening', desc: 'Ask what’s right for your age, history and local guidance.' },
  { title: 'Know your family history', desc: 'Share what you know about breast and related cancers in your family with your doctor.' },
  { title: 'Pass it on', desc: 'Send the message below to someone who might need the nudge.' },
];

const REFERENCES_DATA = [
  { org: 'World Health Organization', title: 'Breast cancer fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/breast-cancer' },
  { org: 'WHO', title: 'Global Breast Cancer Initiative', url: 'https://www.who.int/initiatives/global-breast-cancer-initiative' },
  { org: 'American Cancer Society', title: 'Signs and symptoms', url: 'https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/breast-cancer-signs-and-symptoms.html' },
  { org: 'American Cancer Society', title: 'Screening guidelines', url: 'https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/american-cancer-society-recommendations-for-the-early-detection-of-breast-cancer.html' },
  { org: 'National Cancer Institute', title: 'Antiperspirants and breast cancer', url: 'https://www.cancer.gov/about-cancer/causes-prevention/risk/myths/antiperspirants-fact-sheet' },
  { org: 'Lebanon MoPH', title: 'National Breast Cancer Awareness Campaign 2026', url: 'https://www.moph.gov.lb/en/Pages/11/87130' },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progressScale, setProgressScale] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSign, setExpandedSign] = useState(null);
  const [activeTabId, setActiveTabId] = useState('who');
  const [shareStatus, setShareStatus] = useState('');
  const [canShare, setCanShare] = useState(false);

  const heroRef = useRef(null);
  const shareText = "October is Breast Cancer Awareness Month. Know what's normal for your body, see a healthcare professional if you notice a change, and ask what screening is right for you. #BeyondTheRibbon";

  useEffect(() => {
    document.documentElement.classList.add('reveal-on');
    if (typeof navigator !== 'undefined' && navigator.share) {
      setCanShare(true);
    }
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.reveal, [data-stagger]');

    const showElement = (el) => {
      if (el.hasAttribute('data-stagger')) {
        Array.from(el.children).forEach((child, i) => {
          child.style.setProperty('--d', i);
        });
      }
      el.classList.add('in');
    };

    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            showElement(e.target);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

      targets.forEach((t) => io.observe(t));
      return () => io.disconnect();
    } else {
      targets.forEach(showElement);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(y > 8);
      setProgressScale(maxScroll > 0 ? Math.min(1, y / maxScroll) : 0);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion && heroRef.current && y < heroRef.current.offsetHeight + 200) {
        setParallaxY(y * 0.12);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.site-header')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleSign = (id) => {
    setExpandedSign((prev) => (prev === id ? null : id));
  };

  const handleCopy = async () => {
    let success = false;
    try {
      await navigator.clipboard.writeText(shareText);
      success = true;
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = shareText;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;top:0';
      document.body.appendChild(ta);
      ta.select();
      try {
        success = document.execCommand('copy');
      } catch (err) {}
      ta.remove();
    }
    setShareStatus('');
    setTimeout(() => {
      setShareStatus(
        success
          ? 'Message copied to your clipboard.'
          : 'Copy didn’t work. Please select the message and copy it manually.'
      );
    }, 30);
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: 'Beyond the Ribbon', text: shareText });
    } catch (e) {
      if (e.name !== 'AbortError') {
        setShareStatus('');
        setTimeout(() => {
          setShareStatus('Sharing isn’t available. Use Copy message instead.');
        }, 30);
      }
    }
  };

  const handleTabKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % GUIDANCE_TABS.length;
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + GUIDANCE_TABS.length) % GUIDANCE_TABS.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = GUIDANCE_TABS.length - 1;

    if (nextIndex !== null) {
      e.preventDefault();
      setActiveTabId(GUIDANCE_TABS[nextIndex].id);
      const targetBtn = document.getElementById(`tab-${GUIDANCE_TABS[nextIndex].id}`);
      if (targetBtn) targetBtn.focus();
    }
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progressScale})` }}></span>
      </div>

      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="wrap bar">
          <a className="brand" href="#top" aria-label="Beyond the Ribbon, back to top">
            <svg className="brand-mark" viewBox="60 20 300 460" aria-hidden="true" focusable="false">
              <path
                d="M120 440C150 360 190 300 225 250 270 190 300 140 270 95 240 50 160 50 140 100 120 150 170 210 200 250 235 295 270 360 300 440"
                fill="none"
                stroke="currentColor"
                strokeWidth="52"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>BEYOND THE RIBBON</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr">Menu</span>
            <span className="bars" aria-hidden="true"></span>
          </button>

          <nav
            id="site-nav"
            className={`nav ${menuOpen ? 'open' : ''}`}
            aria-label="Primary"
            onClick={(e) => {
              if (e.target.closest('a')) setMenuOpen(false);
            }}
          >
            <ul>
              <li><a href="#signs">The Signs</a></li>
              <li><a href="#facts">Know the Facts</a></li>
              <li><a href="#detection">Early Detection</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
            <a className="btn btn-small" href="#action">Take action</a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
          <div className="hero-bg" aria-hidden="true">
            <span className="blob b1" style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}></span>
            <span className="blob b2" style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}></span>
          </div>

          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow reveal">October · Breast Cancer Awareness Month</p>
              <h1 id="hero-title">
                <span className="line">
                  <span className="w" style={{ '--i': 0 }}>Awareness</span>{' '}
                  <span className="w" style={{ '--i': 1 }}>today.</span>
                </span>
                <span className="line">
                  <span className="w accent" style={{ '--i': 2 }}>Hope</span>{' '}
                  <span className="w" style={{ '--i': 3 }}>for</span>{' '}
                  <span className="w" style={{ '--i': 4 }}>tomorrow.</span>
                </span>
              </h1>
              <p className="lede reveal" style={{ '--d': 3 }}>
                Breast cancer is found in every country in the world. Knowing what is normal for your body, recognising changes that deserve a medical opinion, and asking a healthcare professional about screening are small, practical steps anyone can take.
              </p>
              <div className="cta-row reveal" style={{ '--d': 4 }}>
                <a className="btn" href="#signs">Know the Signs</a>
                <a className="btn btn-ghost" href="#facts">Explore the Campaign</a>
              </div>
              <p className="trust reveal" style={{ '--d': 5 }}>
                Drawn from the World Health Organization, the American Cancer Society, the US National Cancer Institute and Lebanon’s Ministry of Public Health.
              </p>
            </div>

            <div className="hero-art" style={{ transform: `translate3d(0, ${parallaxY * -0.5}px, 0)` }}>
              <div className="arch">
                <svg className="ribbon" viewBox="0 0 400 500" role="img" aria-label="An animated pink awareness ribbon drawing itself, with a gentle shimmer">
                  <defs>
                    <linearGradient id="rg" gradientUnits="userSpaceOnUse" x1="110" y1="60" x2="310" y2="450">
                      <stop offset="0" stopColor="#E7A0BA" />
                      <stop offset=".45" stopColor="#D982A2" />
                      <stop offset="1" stopColor="#9C3D62" />
                    </linearGradient>
                    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="14" />
                    </filter>
                  </defs>
                  <g transform="translate(0 20)">
                    <path
                      d="M120 440C150 360 190 300 225 250 270 190 300 140 270 95 240 50 160 50 140 100 120 150 170 210 200 250 235 295 270 360 300 440"
                      fill="none"
                      stroke="#702B45"
                      strokeOpacity=".22"
                      strokeWidth="40"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#soft)"
                      transform="translate(10 18)"
                      className="shadow"
                    />
                    <g className="float">
                      <path
                        className="draw d1"
                        pathLength="1"
                        d="M120 440C150 360 190 300 225 250 270 190 300 140 270 95 240 50 160 50 140 100 120 150 170 210 200 250"
                        fill="none"
                        stroke="url(#rg)"
                        strokeWidth="34"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        className="draw d2 edge"
                        pathLength="1"
                        d="M200 250C235 295 270 360 300 440"
                        fill="none"
                        stroke="#702B45"
                        strokeOpacity=".35"
                        strokeWidth="40"
                        strokeLinecap="round"
                      />
                      <path
                        className="draw d2"
                        pathLength="1"
                        d="M200 250C235 295 270 360 300 440"
                        fill="none"
                        stroke="url(#rg)"
                        strokeWidth="34"
                        strokeLinecap="round"
                      />
                      <path
                        className="draw d3"
                        pathLength="1"
                        d="M128 424C156 354 192 298 226 252 268 196 292 142 264 100 238 62 172 62 154 104"
                        fill="none"
                        stroke="#FFF9F6"
                        strokeOpacity=".55"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <g className="sparkles" fill="#FFF9F6">
                        <circle cx="86" cy="150" r="3" />
                        <circle cx="330" cy="210" r="2.5" />
                        <circle cx="318" cy="70" r="3.5" />
                        <circle cx="70" cy="330" r="2.5" />
                      </g>
                    </g>
                  </g>
                </svg>
                <p className="arch-caption">Know your normal.<br />Ask about screening.</p>
              </div>
              <div className="chip chip-a" aria-hidden="true">Know your normal</div>
              <div className="chip chip-b" aria-hidden="true">Ask about screening</div>
            </div>
          </div>
        </section>

        {/* SECTION 01: THE SIGNS */}
        <section className="section" id="signs" aria-labelledby="signs-title">
          <div className="wrap">
            <header className="section-head reveal">
              <p className="eyebrow">01 · The signs</p>
              <h2 id="signs-title">
                Know what’s normal for you.<br />
                <em>Notice what changes.</em>
              </h2>
              <p className="lede">
                Breast cancer doesn’t look or feel the same for everyone, and it can be found before any symptoms appear. Here are changes that deserve a conversation with a healthcare professional. Select a card to read more.
              </p>
            </header>

            <div className="signs-grid" data-stagger>
              {SIGNS_DATA.map((sign) => {
                const isOpen = expandedSign === sign.id;
                return (
                  <article className={`sign ${isOpen ? 'open' : ''}`} key={sign.id}>
                    <h3>
                      <button
                        className="sign-btn"
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`sign-${sign.id}`}
                        onClick={() => toggleSign(sign.id)}
                      >
                        <span className="num" aria-hidden="true">0{sign.id}</span>
                        <span className="t">{sign.title}</span>
                        <span className="chev" aria-hidden="true"></span>
                      </button>
                    </h3>
                    <p className="sign-sum">{sign.summary}</p>
                    <div className="sign-more" id={`sign-${sign.id}`}>
                      <div>
                        <p>{sign.more}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="callout reveal">
              <div className="callout-col">
                <h3>These changes can have other causes</h3>
                <p>
                  Benign (non-cancerous) breast conditions, infections and hormonal changes, including the menstrual cycle, pregnancy, approaching menopause and hormone medicines, can all cause lumps, pain or discharge. The point isn’t to assume the worst. It’s to get an answer.
                </p>
              </div>
              <div className="callout-col strong">
                <h3>Notice a change? Don’t wait for it to hurt.</h3>
                <p>Book an appointment with a doctor or another qualified healthcare professional. A lump doesn’t have to be painful to need checking.</p>
                <a className="btn btn-light" href="#detection">What happens next</a>
              </div>
            </div>

            <p className="source reveal">
              Sources:{' '}
              <a href="https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/breast-cancer-signs-and-symptoms.html" target="_blank" rel="noopener noreferrer">
                American Cancer Society
              </a>{' '}
              ·{' '}
              <a href="https://www.who.int/news-room/fact-sheets/detail/breast-cancer" target="_blank" rel="noopener noreferrer">
                World Health Organization
              </a>
            </p>
          </div>
        </section>

        {/* SECTION 02: MYTH VS FACT */}
        <section className="section tint" id="facts" aria-labelledby="facts-title">
          <div className="wrap">
            <header className="section-head reveal">
              <p className="eyebrow">02 · Myth vs. fact</p>
              <h2 id="facts-title">Know the facts.</h2>
              <p className="lede">
                Misinformation spreads quickly. Each card pairs a common myth with what the evidence says, and where to read it yourself.
              </p>
            </header>

            <ul className="flip-grid" data-stagger>
              {FACTS_DATA.map((item, idx) => (
                <li className="flip" key={idx}>
                  <div className="flip-inner">
                    <div className="face front">
                      <span className="tag">Myth</span>
                      <p className="statement">{item.myth}</p>
                    </div>
                    <div className="face back">
                      <span className="tag">Fact</span>
                      <p>{item.fact}</p>
                      <a className="src" href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                        {item.linkText}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 03: EARLY DETECTION */}
        <section className="section" id="detection" aria-labelledby="detect-title">
          <div className="wrap">
            <header className="section-head reveal">
              <p className="eyebrow">03 · Early detection</p>
              <h2 id="detect-title">
                Finding it early starts<br />
                <em>with a conversation.</em>
              </h2>
              <p className="lede">
                Treatment is generally more effective when breast cancer is found and treated early. The World Health Organization describes early detection as two parts that work together.
              </p>
            </header>

            <div className="pillars" data-stagger>
              <div className="pillar">
                <span className="pillar-n" aria-hidden="true">A</span>
                <h3>Early diagnosis</h3>
                <p>Being aware of the signs and symptoms, seeking medical advice about anything abnormal, and getting timely clinical evaluation and referral.</p>
              </div>
              <div className="pillar">
                <span className="pillar-n" aria-hidden="true">B</span>
                <h3>Screening</h3>
                <p>Mammography for people who have no symptoms, to spot changes before signs appear. It has benefits and limits: it can miss some cancers and can raise false alarms.</p>
              </div>
            </div>

            <div className="tabs-wrap reveal">
              <h3 className="tabs-title">Recommendations differ, by age, personal risk and country</h3>
              <p className="tabs-note">
                Three examples of published guidance. They are <strong>not</strong> medical advice for you, and nothing on this page is a test or risk calculator.
              </p>

              <div className="tablist" role="tablist" aria-label="Examples of screening guidance">
                {GUIDANCE_TABS.map((tab, idx) => {
                  const isSelected = activeTabId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      id={`tab-${tab.id}`}
                      aria-selected={isSelected}
                      aria-controls={`panel-${tab.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      type="button"
                      onClick={() => setActiveTabId(tab.id)}
                      onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {GUIDANCE_TABS.map((tab) => {
                const isSelected = activeTabId === tab.id;
                return (
                  <div
                    key={tab.id}
                    className={`tabpanel ${isSelected ? 'show' : ''}`}
                    role="tabpanel"
                    id={`panel-${tab.id}`}
                    aria-labelledby={`tab-${tab.id}`}
                    tabIndex={0}
                    hidden={!isSelected}
                  >
                    <p>{tab.content}</p>
                    <a className="src" href={tab.linkUrl} target="_blank" rel="noopener noreferrer">
                      {tab.linkText}
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="ask reveal">
              <h3>Questions worth taking to your appointment</h3>
              <ul>
                <li>When should I start screening, and how often?</li>
                <li>Does my family history or personal history change that advice?</li>
                <li>Where can I get a mammogram locally, and what will it cost?</li>
                <li>What should I do if I notice a change between screenings?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 04: HOPE & SUPPORT */}
        <section className="section dark" id="support" aria-labelledby="support-title">
          <div className="dark-glow" aria-hidden="true"></div>
          <div className="wrap">
            <header className="section-head reveal">
              <p className="eyebrow">04 · Hope & support</p>
              <h2 id="support-title">
                You don’t have to<br />
                <em>carry it alone.</em>
              </h2>
              <p className="lede">
                Breast cancer affects women and men, and the people who love them, in every country. Whoever you are in this story, there is room for you here.
              </p>
            </header>

            <div className="support-grid" data-stagger>
              <article className="support-card">
                <h3>If you’re facing a diagnosis</h3>
                <p>Take it one step at a time. There is no right way to feel, and you’re allowed to ask for explanations again, bring someone to appointments, or take a day to breathe. Treatment depends on you and on the type of cancer, so ask your care team what it means in your case.</p>
              </article>
              <article className="support-card">
                <h3>If someone you love is</h3>
                <p>You don’t need perfect words. Showing up, listening, and offering something specific, such as a lift, a meal or company at an appointment, often helps more than advice. Let them lead on what they want to share.</p>
              </article>
              <article className="support-card">
                <h3>If you’re the caregiver</h3>
                <p>Your wellbeing matters too. Caring for someone can be tiring and lonely, and asking for help is part of caring well. Support groups, counsellors and community services exist for you as well.</p>
              </article>
            </div>

            <div className="support-foot reveal">
              <p className="pull">Good care is a team effort: doctors, nurses, counsellors, physiotherapists and social workers can all be part of it.</p>
              <p className="small">The World Health Organization notes that early access to a multidisciplinary team, including mental health and rehabilitation support, helps people during and after treatment.</p>
              <ul className="link-row">
                <li><a href="https://www.cancer.org/support-programs-and-services.html" target="_blank" rel="noopener noreferrer">American Cancer Society support programmes</a></li>
                <li><a href="https://www.moph.gov.lb/en/Pages/11/87130" target="_blank" rel="noopener noreferrer">Lebanon MoPH campaign information</a></li>
                <li><a href="https://www.who.int/news-room/fact-sheets/detail/breast-cancer" target="_blank" rel="noopener noreferrer">WHO breast cancer fact sheet</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 05: TAKE ACTION */}
        <section className="section" id="action" aria-labelledby="action-title">
          <div className="wrap">
            <header className="section-head reveal">
              <p className="eyebrow">05 · Take action</p>
              <h2 id="action-title">
                Five small steps,<br />
                <em>starting today.</em>
              </h2>
            </header>

            <ol className="steps" data-stagger>
              {STEPS_DATA.map((step, idx) => (
                <li key={idx}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>

            <div className="share reveal">
              <div>
                <h3>Share the message</h3>
                <blockquote id="share-text">{shareText}</blockquote>
              </div>
              <div className="share-actions">
                <button className="btn" type="button" id="copy-btn" onClick={handleCopy}>
                  Copy message
                </button>
                {canShare && (
                  <button className="btn btn-ghost" type="button" id="share-btn" onClick={handleShare}>
                    Share…
                  </button>
                )}
                <p id="share-status" className="sr-live" role="status" aria-live="polite">
                  {shareStatus}
                </p>
              </div>
            </div>

            <div className="refs reveal">
              <h3>Reliable references</h3>
              <ul>
                {REFERENCES_DATA.map((ref, idx) => (
                  <li key={idx}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      <strong>{ref.org}</strong> {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap foot-grid">
          <div>
            <p className="foot-brand">BEYOND THE RIBBON</p>
            <p className="foot-tag">Awareness today. Hope for tomorrow.</p>
            <p className="foot-credit">A digital awareness concept by ARZICode.lb.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="foot-nav">
              <li><a href="#signs">The Signs</a></li>
              <li><a href="#facts">Know the Facts</a></li>
              <li><a href="#detection">Early Detection</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#action">Take Action</a></li>
            </ul>
          </nav>
          <div className="foot-legal">
            <p>
              <strong>Medical information disclaimer.</strong> This website is for general awareness only. It is not medical advice, does not diagnose or screen for any condition, and is not a substitute for a qualified healthcare professional. If you notice a change in your breasts or have concerns about your health, contact a healthcare professional.
            </p>
            <p>
              <strong>About this project.</strong> ARZICode.lb created this website as an independent awareness concept. ARZICode.lb is not a medical provider and is not an official partner of the World Health Organization, the American Cancer Society, the National Cancer Institute, Lebanon’s Ministry of Public Health or any other organisation named here. Their materials are linked as references. Content was checked against those sources in October 2026, and guidance can change, so please consult the originals.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}