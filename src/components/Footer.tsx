import React, { useState, useEffect } from "react";
import { Mail, ArrowUp, Send, CheckCircle, Clock } from "lucide-react";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Live Timezone Tracker
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API pipeline transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 border-t border-white/[0.03] overflow-hidden bg-[#030305]/60">
      {/* Structural visual background */}
      <div className="absolute inset-0 bg-grid-tech bg-grid-tech-subtle opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Core Grid section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-24">
          
          {/* Metadata Block Col */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs tracking-[0.3em] text-[#10b981]">
                [ 05 // INITIATE TRANSMISSION ]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-[1.1]">
                LET’S SHAPE<br />
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-white/45">
                  DIGITAL REALMS
                </span>
              </h2>
            </div>

            <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed font-light">
              Whether you are mapping out a decentralized high-throughput trading desk, 
              establishing atomic visual tokens, or exploring custom animations — my node 
              is open. Let's build.
            </p>

            {/* Quick stats & time zone indicators */}
            <div className="flex flex-col gap-4 font-mono text-[9px] text-white/40 border-t border-white/5 pt-6 w-full">
              <div className="flex items-center gap-3">
                <Clock className="w-3.5 h-3.5 text-[#10b981]" />
                <span>LOCAL_NODE_CLOCK // EST // </span>
                <span className="text-white font-bold tracking-widest">{localTime || "12:00:00"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-[#10b981]" />
                <span>COMMS_DIRECT // </span>
                <a href="mailto:hello@matveyan.studio" className="text-white hover:text-[#10b981] transition-colors underline">
                  hello@matveyan.studio
                </a>
              </div>
            </div>
          </div>

          {/* Form Col */}
          <div className="lg:col-span-7 w-full bg-white/[0.01] border border-white/[0.04] p-6 sm:p-8 rounded-sm relative">
            <div className="absolute top-4 right-4 font-mono text-[8px] text-white/20 tracking-wider">
              COMMS_CHANNEL // SECURE_SSL
            </div>

            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
                <CheckCircle className="w-12 h-12 text-[#10b981] animate-bounce" />
                <div className="flex flex-col gap-1.5">
                  <span className="font-display text-lg font-medium text-white">TRANSMISSION_SUCCESS</span>
                  <span className="font-sans text-xs text-white/40">Your data payload has been integrated. Comms initiated shortly.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-name" className="font-mono text-[9px] tracking-widest text-white/40">
                      SENDER_NAME
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Satoshi Nakamoto"
                      className="bg-black/40 border border-white/5 rounded px-4 py-3 font-sans text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#10b981]/50 focus:bg-black/60 transition-all duration-300"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-email" className="font-mono text-[9px] tracking-widest text-white/40">
                      COMMS_EMAIL
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. satoshi@bitcoin.org"
                      className="bg-black/40 border border-white/5 rounded px-4 py-3 font-sans text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#10b981]/50 focus:bg-black/60 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-message" className="font-mono text-[9px] tracking-widest text-white/40">
                    PAYLOAD_MESSAGE
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Describe your technical architecture or layout goals..."
                    className="bg-black/40 border border-white/5 rounded px-4 py-3 font-sans text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#10b981]/50 focus:bg-black/60 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="form-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-center gap-2 font-mono text-[9px] tracking-widest text-black bg-[#10b981] disabled:bg-white/20 disabled:text-white/40 px-5 py-3.5 rounded-sm hover:bg-[#10b981]/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer self-end w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>TRANSMITTING_PAYLOAD...</>
                  ) : (
                    <>
                      EXECUTE_SUBMIT
                      <Send className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Decorative divider */}
        <div className="h-[1px] bg-white/10 w-full mb-12 flex justify-between items-center text-[7px] font-mono text-white/25">
          <span>COGNITIVE_BOUND_EST_2026</span>
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 hover:text-[#10b981] transition-colors cursor-pointer select-none"
          >
            LAUNCH_BACK_TO_TOP
            <ArrowUp className="w-3 h-3 animate-pulse" />
          </button>
        </div>

        {/* Huge bottom branding name spanning the footer */}
        <div 
          id="footer-huge-typography" 
          className="text-center select-none font-display text-[10vw] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none"
        >
          MATVEYAN.STUDIO
        </div>

        {/* Legal copyright footer metadata row */}
        <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-[8px] text-white/30 gap-4 mt-8">
          <span>© 2026 MATVEYAN STUDIO. ALL SYSTEM CODES RESERVED.</span>
          <span>MADE FOR DIGITAL CINEMATICS // HOST_NODE_RUNNING</span>
        </div>

      </div>
    </footer>
  );
}
