import { FormEvent, useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  Link,
  useLocation,
  useNavigate,
} from "react-router";

const images = {
  hero: [
    "https://images.unsplash.com/photo-1740431377901-c2f28d50c759?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1570212773364-e30cd076539e?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1652374968229-a66a1c170c04?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1641382161166-4f3c320f0c6d?auto=format&fit=crop&w=2000&q=90",
  ],
  portrait:
    "https://images.unsplash.com/photo-1727791653790-2f2a64a37c7f?auto=format&fit=crop&w=1200&q=90",
  earrings:
    "https://images.unsplash.com/photo-1727791865934-5a72e29f5345?auto=format&fit=crop&w=1000&q=90",
  necklace:
    "https://images.unsplash.com/photo-1650873441621-08dbceadb7b8?auto=format&fit=crop&w=1000&q=90",
  detail:
    "https://images.unsplash.com/photo-1695050049047-54e27a908898?auto=format&fit=crop&w=1200&q=90",
  bride:
    "https://images.unsplash.com/photo-1716504628084-97224213ca6d?auto=format&fit=crop&w=1200&q=90",
};

const products = [
  {
    name: "Rani Haar",
    category: "Bridal Heirlooms",
    description: "A regal, layered gold necklace for landmark celebrations.",
    image:
      "https://images.unsplash.com/flagged/photo-1570055349452-29232699cc63?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Temple Choker",
    category: "Heritage Gold",
    description: "Sculptural motifs shaped by the traditions of Gujarat.",
    image:
      "https://images.unsplash.com/photo-1650873441621-08dbceadb7b8?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "The Sitara Set",
    category: "Diamond",
    description: "Light-catching forms with a contemporary, graceful line.",
    image:
      "https://images.unsplash.com/photo-1727791865934-5a72e29f5345?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Mogra Bangles",
    category: "Everyday Gold",
    description: "Delicate floral rhythm, designed for effortless layering.",
    image:
      "https://images.unsplash.com/photo-1695049918857-1e27d67782e5?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Navya Necklace",
    category: "Celebration",
    description: "An intricate composition of warm gold and fine detail.",
    image:
      "https://images.unsplash.com/photo-1650873442237-3838533a50be?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Noor Earrings",
    category: "Diamond",
    description: "Elegant drops that bring a quiet brilliance to every look.",
    image:
      "https://images.unsplash.com/photo-1727791762060-978deff14028?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Aaradhya Bridal Set",
    category: "Bridal Heirlooms",
    description: "A complete bridal expression, handcrafted to become legacy.",
    image:
      "https://images.unsplash.com/photo-1600312914724-0c318dd0eb29?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Saanjh Pendant",
    category: "Everyday Gold",
    description: "A soft, versatile silhouette for rituals big and small.",
    image:
      "https://images.unsplash.com/photo-1643865853716-eeb6d02daede?auto=format&fit=crop&w=900&q=90",
  },
];

function Monogram({ light = false }: { light?: boolean }) {
  return (
    <div className={`monogram ${light ? "monogram-light" : ""}`} aria-hidden="true">
      <span>M</span>
      <span>J</span>
      <i />
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M14 7l5 5-5 5" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  );
}

function useSmoothPage() {
  const location = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash) {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [location.pathname, location.hash]);
}

function Header({ solid = false }: { solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    const onScroll = () => setScrolled(solid || window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link to="/" className="brand" aria-label="Momai Jewellers home" onClick={closeMenu}>
        <Monogram />
        <span className="brand-name">Momai Jewellers</span>
      </Link>
      <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
        <Link to="/#story" onClick={closeMenu}>Our story</Link>
        <Link to="/#collections" onClick={closeMenu}>Collections</Link>
        <Link to="/products" onClick={closeMenu}>Our range</Link>
        <Link to="/#craft" onClick={closeMenu}>Craft</Link>
        <Link to="/#visit" onClick={closeMenu}>Visit us</Link>
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <MenuIcon open={menuOpen} />
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <Monogram light />
        <span>Momai Jewellers</span>
      </div>
      <div className="footer-details">
        <div>
          <span>Visit</span>
          <p>Omkar Plaza, Bopal<br />Ahmedabad, Gujarat 380058</p>
          <a
            href="https://maps.google.com/?q=Omkar+Plaza+Bopal+Ahmedabad+Gujarat+380058"
            target="_blank"
            rel="noreferrer"
          >
            Get directions
          </a>
        </div>
        <div>
          <span>Connect</span>
          <a href="tel:+919274557144">092745 57144</a>
          <p>Open daily · closes 9 pm</p>
        </div>
        <div>
          <span>Explore</span>
          <Link to="/products">Our range</Link>
          <Link to="/#visit">Book a visit</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Momai Jewellers</span>
        <span>Hallmarked purity · Lifelong trust</span>
      </div>
    </footer>
  );
}

function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % images.hero.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-slides" aria-hidden="true">
        {images.hero.map((image, index) => (
          <img
            key={image}
            className={index === active ? "is-active" : ""}
            src={image}
            alt=""
          />
        ))}
      </div>
      <div className="hero-wash" />
      <div className="hero-copy">
        <p className="eyebrow light">Timeless by tradition · Distinct by design</p>
        <h1>Crafted for<br /><em>your story.</em></h1>
        <Link className="text-link light-link" to="/#collections">
          Discover our world <ArrowIcon />
        </Link>
      </div>
      <div className="hero-number">Since 1989 · Gujarat</div>
      <div className="slide-progress" aria-hidden="true">
        {images.hero.map((_, index) => (
          <span key={index} className={index === active ? "is-active" : ""} />
        ))}
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section className="offers reveal" aria-label="Exclusive website offers">
      <div className="offer-intro">
        <p className="eyebrow">Exclusive online introduction</p>
        <p>Mention our website during your showroom visit to unlock these privileges.</p>
      </div>
      <div className="offer-item">
        <strong>0%</strong>
        <span>Making charges<br />on selected designs</span>
      </div>
      <div className="offer-item">
        <strong>₹1,000</strong>
        <span>Off your purchase<br />through the website</span>
      </div>
    </section>
  );
}

function HomePage() {
  useSmoothPage();

  return (
    <main>
      <Header />
      <HeroSlideshow />
      <div className="marquee" aria-hidden="true">
        <div>
          <span>Bridal heirlooms</span><i>✦</i><span>Handcrafted gold</span><i>✦</i>
          <span>Rare diamonds</span><i>✦</i><span>Made in Gujarat</span><i>✦</i>
          <span>Bridal heirlooms</span><i>✦</i><span>Handcrafted gold</span><i>✦</i>
          <span>Rare diamonds</span><i>✦</i><span>Made in Gujarat</span><i>✦</i>
        </div>
      </div>
      <Offers />

      <section className="story section-pad reveal" id="story">
        <div className="section-index">01</div>
        <div className="story-heading">
          <p className="eyebrow">A legacy, lovingly continued</p>
          <h2>Jewels with a memory of their own.</h2>
        </div>
        <div className="story-copy">
          <p>
            At Momai, every piece begins with a feeling. Guided by generations of
            artistry, we shape gold and stones into keepsakes that live far beyond
            an occasion.
          </p>
          <Link className="text-link" to="/#craft">Our heritage <ArrowIcon /></Link>
        </div>
      </section>

      <section className="editorial-pair reveal">
        <figure className="portrait-card">
          <img src={images.portrait} alt="Woman wearing delicate gold jewelry" />
          <figcaption>Quiet radiance · 2025</figcaption>
        </figure>
        <div className="editorial-note">
          <Monogram />
          <blockquote>“Adornment is not simply what you wear. It is what you remember.”</blockquote>
          <span>— The house of Momai</span>
        </div>
      </section>

      <section className="collections section-pad reveal" id="collections">
        <div className="section-topline">
          <div>
            <p className="eyebrow">Curated expressions</p>
            <h2>For every chapter.</h2>
          </div>
          <p>
            Pieces composed for grand celebrations, quiet rituals, and everything
            beautifully in between.
          </p>
        </div>
        <div className="collection-grid">
          <Link className="collection-card tall" to="/products">
            <img src={images.bride} alt="Woman wearing bridal jewelry" />
            <span className="card-number">01</span>
            <div><h3>Bridal</h3><p>Heritage, made personal</p></div>
            <span className="card-arrow"><ArrowIcon /></span>
          </Link>
          <Link className="collection-card" to="/products">
            <img src={images.earrings} alt="Gold earrings arranged on soft fabric" />
            <span className="card-number">02</span>
            <div><h3>Everyday Gold</h3><p>Effortless, enduring forms</p></div>
            <span className="card-arrow"><ArrowIcon /></span>
          </Link>
          <Link className="collection-card" to="/products">
            <img src={images.necklace} alt="Handcrafted gold necklace" />
            <span className="card-number">03</span>
            <div><h3>Celebration</h3><p>Created for the moment</p></div>
            <span className="card-arrow"><ArrowIcon /></span>
          </Link>
        </div>
      </section>

      <section className="craft reveal" id="craft">
        <div className="craft-image"><img src={images.detail} alt="Intricate gold necklace craftsmanship" /></div>
        <div className="craft-copy">
          <div className="section-index">02</div>
          <p className="eyebrow light">The Momai standard</p>
          <h2>Made slowly.<br />Kept forever.</h2>
          <p className="craft-body">
            From the first hand-drawn line to the final polish, each piece passes
            through the hands of skilled artisans. Time is our most precious material.
          </p>
          <div className="craft-stats">
            <div><strong>35+</strong><span>years of trust</span></div>
            <div><strong>6</strong><span>craft disciplines</span></div>
            <div><strong>1</strong><span>singular standard</span></div>
          </div>
        </div>
      </section>

      <section className="visit section-pad reveal" id="visit">
        <div className="visit-mark"><Monogram /></div>
        <p className="eyebrow">A more personal way to discover</p>
        <h2>Find the piece<br />that feels like <em>you.</em></h2>
        <p>
          Visit our Bopal showroom for a private consultation and experience Momai
          craftsmanship up close.
        </p>
        <Link className="primary-button" to="/products">
          Explore & plan your visit <ArrowIcon />
        </Link>
      </section>
      <Footer />
    </main>
  );
}

function EnquiryModal({
  product,
  onClose,
}: {
  product: (typeof products)[number];
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInput.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close form">×</button>
        {submitted ? (
          <div className="form-success">
            <Monogram />
            <p className="eyebrow">Thank you</p>
            <h2>We’ll be in touch.</h2>
            <p>
              Your interest in the {product.name} has been noted. Our representative
              will connect with you shortly to plan your visit.
            </p>
            <button className="primary-button" type="button" onClick={onClose}>Continue exploring</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Private viewing request</p>
            <h2 id="enquiry-title">Visit us for the<br /><em>{product.name}</em></h2>
            <p className="modal-lead">Share your details and our representative will personally connect with you.</p>
            <form onSubmit={submit}>
              <label>
                <span>Full name</span>
                <input ref={firstInput} name="name" type="text" required placeholder="Your name" />
              </label>
              <label>
                <span>Phone number</span>
                <input name="phone" type="tel" required placeholder="+91" />
              </label>
              <label>
                <span>Email address</span>
                <input name="email" type="email" placeholder="you@example.com" />
              </label>
              <label>
                <span>Preferred visit date</span>
                <input name="date" type="date" required />
              </label>
              <label className="full-field">
                <span>Anything you’d like us to know?</span>
                <textarea name="message" rows={3} placeholder="Occasion, customization, or preferred time" />
              </label>
              <button className="primary-button full-field" type="submit">
                Request a callback <ArrowIcon />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ProductsPage() {
  useSmoothPage();
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);

  return (
    <main className="products-page">
      <Header solid />
      <section className="products-hero">
        <p className="eyebrow">The Momai range</p>
        <h1>Jewels chosen<br /><em>with feeling.</em></h1>
        <p>
          Explore signature pieces across bridal, celebration, diamond, and everyday
          gold. Select any design to arrange a personal viewing at our Bopal showroom.
        </p>
      </section>
      <Offers />
      <section className="product-gallery section-pad reveal">
        <div className="product-gallery-intro">
          <p className="eyebrow">Our collection</p>
          <h2>Discover your piece.</h2>
          <span>{products.length} signature expressions</span>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <button
              className="product-card"
              type="button"
              key={product.name}
              onClick={() => setSelectedProduct(product)}
            >
              <span className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="product-action">Plan a viewing <ArrowIcon /></span>
              </span>
              <span className="product-meta">
                <span>
                  <small>{product.category}</small>
                  <strong>{product.name}</strong>
                  <p>{product.description}</p>
                </span>
                <i>{String(index + 1).padStart(2, "0")}</i>
              </span>
            </button>
          ))}
        </div>
      </section>
      <Footer />
      {selectedProduct && (
        <EnquiryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </main>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="not-found">
      <Monogram />
      <p className="eyebrow">Page not found</p>
      <h1>This jewel is yet to be made.</h1>
      <button className="primary-button" type="button" onClick={() => navigate("/")}>Return home</button>
    </main>
  );
}

const testimonials = [
  { quote: "The craftsmanship on our bridal set was breathtaking. Lifelong quality from a family we trust.", author: "Pooja & Rohan Shah" },
  { quote: "Absolute purity and stunning heritage designs. The experience at their Bopal showroom was wonderful.", author: "Dr. Darshana Patel" },
  { quote: "Bought everyday gold bangles and the finish is exquisite. Truly the pride of Gujarat craftsmanship.", author: "Kinjal Mehta" },
];

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/products", Component: ProductsPage },
  { path: "*", Component: NotFound },
], {
  basename: "/Momai_Jewellers",
});
