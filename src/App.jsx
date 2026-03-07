import { useState, useEffect } from "react";

// ─── REAL PORTUGAL / LISBON DATA ───────────────────────────────────────────

const HOTLINES = [
  {
    name: "Linha Verde – Violência Doméstica",
    nameEn: "National DV Info Line",
    number: "800 202 148",
    text: null,
    sms: "SMS 3060",
    available: "24h / 7 dias",
    lang: "PT",
    note: "Gratuito · Anónimo · Confidencial",
    noteEn: "Free · Anonymous · Confidential",
    primary: true,
  },
  {
    name: "Emergência Nacional",
    nameEn: "National Emergency",
    number: "112",
    text: null,
    sms: null,
    available: "24h / 7 dias",
    lang: "PT/EN",
    note: "Polícia · Bombeiros · Ambulância",
    noteEn: "Police · Fire · Ambulance",
    primary: true,
  },
  {
    name: "APAV – Apoio à Vítima",
    nameEn: "APAV – Victim Support",
    number: "116 006",
    text: null,
    sms: null,
    available: "Seg–Sex 8h–23h",
    lang: "PT/EN",
    note: "Gratuito · Apoio emocional e jurídico",
    noteEn: "Free · Emotional & legal support",
    primary: false,
  },
  {
    name: "Linha Nacional Emergência Social",
    nameEn: "Social Emergency Line",
    number: "144",
    text: null,
    sms: null,
    available: "24h / 7 dias",
    lang: "PT",
    note: "Gratuito · Para situações de risco imediato",
    noteEn: "Free · Immediate risk situations",
    primary: false,
  },
  {
    name: "AMCV – Mulheres Contra a Violência",
    nameEn: "AMCV – Women Against Violence",
    number: "213 802 165",
    text: null,
    sms: null,
    available: "Seg–Sex horas úteis",
    lang: "PT",
    note: "Lisboa · Apoio especializado a mulheres",
    noteEn: "Lisbon · Specialist support for women",
    primary: false,
  },
  {
    name: "APAV SAFE – Estrangeiras / Foreigners",
    nameEn: "APAV SAFE – Foreign Nationals",
    number: "+351 21 358 79 14",
    text: null,
    sms: null,
    available: "Seg–Sex 10h–17h30",
    lang: "EN/PT/FR/ES",
    note: "Para não-portuguesas · imigrantes · turistas",
    noteEn: "For non-Portuguese · immigrants · tourists",
    primary: false,
  },
  {
    name: "ILGA Portugal – LGBTQI+",
    nameEn: "ILGA Portugal – LGBTQI+",
    number: "218 873 918",
    text: null,
    sms: null,
    available: "Consultar horário",
    lang: "PT/EN",
    note: "Apoio específico para pessoas LGBTQI+",
    noteEn: "Specialist support for LGBTQI+ people",
    primary: false,
  },
];

// Note: Shelter addresses in Portugal are kept confidential by law for safety.
// The referral bodies below are the real, verifiable entry points.
const SHELTERS = [
  {
    name: "APAV – Casa de Abrigo Lisboa",
    type: "Casa de Abrigo",
    via: "Via referência: ligue 116 006",
    viaEn: "By referral: call 116 006",
    phone: "116 006",
    note: "2 casas de abrigo em Lisboa · mulheres e filhos",
    noteEn: "2 shelters in Lisbon · women & children",
    address: "Morada confidencial por razões de segurança",
    addressEn: "Address confidential for safety",
    accepts_children: true,
    accepts_pets: false,
    cost: "Gratuito",
    available: "24h",
    id_required: false,
  },
  {
    name: "AMCV – Associação de Mulheres Contra a Violência",
    type: "Casa de Abrigo + Acompanhamento",
    via: "Ligue 213 802 165",
    viaEn: "Call 213 802 165",
    phone: "213 802 165",
    note: "Alameda D. Afonso Henriques 78, Lisboa",
    noteEn: "Alameda D. Afonso Henriques 78, Lisbon",
    address: "Alameda D. Afonso Henriques, 78 – 1º Esq.",
    addressEn: "Alameda D. Afonso Henriques, 78 – 1st fl.",
    accepts_children: true,
    accepts_pets: false,
    cost: "Gratuito",
    available: "Seg–Sex",
    id_required: false,
  },
  {
    name: "Santa Casa da Misericórdia de Lisboa",
    type: "Acolhimento de Emergência",
    via: "Ligue 800 202 148 ou 144",
    viaEn: "Call 800 202 148 or 144",
    phone: "144",
    note: "Unidade de emergência social · disponível 24h",
    noteEn: "Social emergency unit · available 24h",
    address: "Cais do Gás, Lisboa (encaminhamento)",
    addressEn: "Via referral from emergency line",
    accepts_children: true,
    accepts_pets: false,
    cost: "Gratuito",
    available: "24h",
    id_required: false,
  },
  {
    name: "Rede Nacional de Casas de Abrigo (CIG)",
    type: "Rede Nacional – Referência",
    via: "Via Linha Verde 800 202 148",
    viaEn: "Via hotline 800 202 148",
    phone: "800 202 148",
    note: "Encontra vaga em qualquer casa de abrigo em Portugal",
    noteEn: "Finds bed in any shelter across Portugal",
    address: "Comissão para a Cidadania e Igualdade de Género",
    addressEn: "Commission for Citizenship & Gender Equality",
    accepts_children: true,
    accepts_pets: false,
    cost: "Gratuito",
    available: "24h",
    id_required: false,
  },
];

const POLICE_STATIONS = [
  { name: "PSP Lisboa – Restauradores (Turismo)", phone: "218 804 030", note: "Esquadra com atendimento em inglês" },
  { name: "PSP Lisboa – Intendente", phone: "218 112 000", note: "Esquadra central" },
  { name: "GNR – Linha de Emergência", phone: "213 217 000", note: "Para zonas fora da cidade" },
];

const HOSPITALS = [
  { name: "Hospital de Santa Maria", phone: "217 805 000", note: "Urgências · Av. Prof. Egas Moniz", area: "Norte" },
  { name: "Hospital São José", phone: "218 841 000", note: "Urgências · R. José António Serrano", area: "Centro" },
  { name: "Hospital Curry Cabral", phone: "213 426 600", note: "Urgências · R. da Beneficência 8", area: "Saldanha" },
  { name: "Hospital Santa Cruz (Carnaxide)", phone: "214 274 000", note: "Urgências · Av. Prof. Dr. Reinaldo dos Santos", area: "Oeste" },
];

const SAFETY_ITEMS = [
  { category: "Documentos", categoryEn: "Documents", items: ["BI / Cartão de Cidadão", "Passaporte", "Certidões de nascimento (seus e dos filhos)", "Cartão de Saúde (ACES / SNS)", "NISS (Segurança Social)", "Documentos de imigração / vistos"], icon: "📄" },
  { category: "Dinheiro", categoryEn: "Money", items: ["Dinheiro em numerário (qualquer valor ajuda)", "Cartão de débito / crédito", "Cheques ou multibanco"], icon: "💳" },
  { category: "Medicamentos", categoryEn: "Medications", items: ["Os seus medicamentos", "Medicamentos dos filhos", "Contracetivos / pílula", "Dispositivos médicos"], icon: "💊" },
  { category: "Telemóvel e Comunicação", categoryEn: "Phone & Comms", items: ["Carregador de telemóvel", "Segundo telemóvel (se possível)", "Lista de contactos escrita à mão"], icon: "📱" },
  { category: "Para os filhos", categoryEn: "For children", items: ["Brinquedo ou peluche favorito", "Muda de roupa para cada filho", "Documentos de custódia (se tiver)"], icon: "🧸" },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function SafeHarborLisboa() {
  const [activeTab, setActiveTab] = useState("home");
  const [lang, setLang] = useState("pt"); // "pt" or "en"

  // ── PWA Install prompt ──────────────────────────────────────────────────
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const ios = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    setIsIOS(ios);
    // Detect if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
    setIsStandalone(standalone);

    // Android/Chrome install prompt
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show iOS tip after 8 seconds if not standalone
    if (ios && !standalone) {
      setTimeout(() => setShowInstallBanner(true), 8000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      setInstallPrompt(null);
    }
    setShowInstallBanner(false);
  };
  const [hasChildren, setHasChildren] = useState(null);
  const [hasPets, setHasPets] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const t = (pt, en) => lang === "pt" ? pt : en;

  const handleQuickExit = () => {
    // Replace history so back button doesn't return here
    window.location.replace("https://weather.com");
  };

  const toggleCheck = (cat, item) => {
    const key = `${cat}:${item}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const TABS = [
    { id: "home", label: t("Ajuda", "Help"), icon: "🏠" },
    { id: "shelters", label: t("Abrigo", "Shelter"), icon: "🛏" },
    { id: "hotlines", label: t("Linhas", "Lines"), icon: "📞" },
    { id: "safety", label: t("Plano", "Plan"), icon: "✅" },
    { id: "resources", label: t("Mais", "More"), icon: "💙" },
  ];

  const cardStyle = {
    background: "white",
    borderRadius: 12,
    padding: "16px",
    marginBottom: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    border: "1px solid #EDE8E1",
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F7F3EE", minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.12)" }}>

      {/* ── PWA INSTALL BANNER ── */}
      {showInstallBanner && !isStandalone && (
        <div style={{
          position: "fixed", bottom: 68, left: "50%", transform: "translateX(-50%)",
          width: "calc(100% - 24px)", maxWidth: 406,
          background: "#1A2E27", color: "#F7F3EE",
          borderRadius: 12, padding: "12px 14px",
          display: "flex", alignItems: "center", gap: 10,
          zIndex: 9998, boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>📲</span>
          <div style={{ flex: 1, fontSize: 12, lineHeight: 1.5 }}>
            {isIOS
              ? t('Toque em ⎙ e depois "Adicionar ao ecrã inicial" para guardar este app', 'Tap ⎙ then "Add to Home Screen" to save this app')
              : t('Guarde este app no telemóvel — funciona sem internet', 'Save this app to your phone — works offline')
            }
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
            {!isIOS && (
              <button onClick={handleInstall} style={{
                background: "#C4956A", color: "white", border: "none",
                borderRadius: 6, padding: "6px 10px", fontSize: 11,
                fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif",
              }}>
                {t("Instalar", "Install")}
              </button>
            )}
            <button onClick={() => setShowInstallBanner(false)} style={{
              background: "transparent", color: "#A8C4B8", border: "none",
              fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif",
            }}>
              {t("Fechar", "Close")}
            </button>
          </div>
        </div>
      )}

      {/* ── QUICK EXIT ── */}
      <button
        onClick={handleQuickExit}
        style={{
          position: "fixed", top: 12, right: 12, zIndex: 9999,
          background: "#2D4A3E", color: "#F7F3EE", border: "none",
          borderRadius: 6, padding: "8px 14px", fontSize: 11,
          fontFamily: "'Georgia', serif", letterSpacing: "0.08em",
          cursor: "pointer", fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        ✕ {t("SAIR AGORA", "EXIT NOW")}
      </button>

      {/* ── HEADER ── */}
      <div style={{ background: "#2D4A3E", color: "#F7F3EE", padding: "24px 20px 16px", borderBottom: "3px solid #C4956A" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🌿</span>
            <div>
              <div style={{ fontSize: 19, fontWeight: "bold" }}>Porto Seguro · Lisboa</div>
              <div style={{ fontSize: 10, opacity: 0.7, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {t("Não está sozinha", "You are not alone")}
              </div>
            </div>
          </div>
          {/* Language toggle */}
          <div style={{ display: "flex", gap: 4 }}>
            {["pt", "en"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: "4px 10px", borderRadius: 20, border: "1px solid",
                borderColor: lang === l ? "#C4956A" : "rgba(255,255,255,0.3)",
                background: lang === l ? "#C4956A" : "transparent",
                color: "#F7F3EE", fontSize: 11, cursor: "pointer",
                fontFamily: "'Georgia', serif", fontWeight: lang === l ? "bold" : "normal",
              }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display: "flex", background: "#EDE8E1", borderBottom: "1px solid #D4C9BC", overflowX: "auto" }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: "10px 4px 8px", border: "none",
            background: activeTab === tab.id ? "#F7F3EE" : "transparent",
            borderBottom: activeTab === tab.id ? "3px solid #C4956A" : "3px solid transparent",
            cursor: "pointer", fontSize: 10,
            color: activeTab === tab.id ? "#2D4A3E" : "#7A6E64",
            fontFamily: "'Georgia', serif",
            fontWeight: activeTab === tab.id ? "bold" : "normal",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            minWidth: 60, whiteSpace: "nowrap", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: 16 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ paddingBottom: 80 }}>

        {/* ════ HOME ════ */}
        {activeTab === "home" && (
          <div>
            {/* Emergency strip */}
            <div style={{ background: "#8B2635", color: "white", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: "bold", letterSpacing: "0.04em" }}>
                  {t("PERIGO IMEDIATO?", "IMMEDIATE DANGER?")}
                </div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>
                  {t("Ligue 112 · Polícia · Bombeiros", "Call 112 · Police · Fire · Ambulance")}
                </div>
              </div>
              <a href="tel:112" style={{ background: "white", color: "#8B2635", padding: "10px 18px", borderRadius: 6, fontSize: 14, fontWeight: "bold", textDecoration: "none", fontFamily: "'Georgia', serif" }}>
                112
              </a>
            </div>

            <div style={{ padding: "22px 20px 0" }}>
              <div style={{ fontSize: 22, color: "#2D4A3E", fontWeight: "bold", lineHeight: 1.3, marginBottom: 8 }}>
                {t("Está em segurança aqui.", "You are safe here.")}
              </div>
              <div style={{ fontSize: 14, color: "#5A5147", lineHeight: 1.7, marginBottom: 22 }}>
                {t(
                  "Seja o que for que precisa — um lugar para dormir esta noite, alguém com quem falar, ou apenas informação — estamos aqui, sem julgamentos.",
                  "Whatever you need — a place to sleep tonight, someone to talk to, or just information — we are here, no questions asked."
                )}
              </div>

              {/* Quick filter */}
              <div style={{ fontSize: 12, color: "#7A6E64", marginBottom: 10, fontStyle: "italic" }}>
                {t("Para encontrar o abrigo certo:", "To find the right shelter:")}
              </div>

              {[
                { q: t("Há crianças consigo?", "Are children with you?"), state: hasChildren, set: setHasChildren },
                { q: t("Tem animais de estimação?", "Do you have a pet?"), state: hasPets, set: setHasPets },
              ].map(({ q, state, set }, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                  <div style={{ fontSize: 13, color: "#5A5147", flex: 1 }}>{q}</div>
                  {[true, false].map(val => (
                    <button key={String(val)} onClick={() => set(val)} style={{
                      width: 60, padding: "9px 6px", borderRadius: 8,
                      border: `2px solid ${state === val ? "#2D4A3E" : "#D4C9BC"}`,
                      background: state === val ? "#2D4A3E" : "white",
                      color: state === val ? "white" : "#5A5147",
                      cursor: "pointer", fontSize: 13, fontFamily: "'Georgia', serif",
                    }}>
                      {val ? t("Sim", "Yes") : t("Não", "No")}
                    </button>
                  ))}
                </div>
              ))}

              <div style={{ height: 18 }} />

              <button onClick={() => setActiveTab("shelters")} style={{
                width: "100%", background: "#2D4A3E", color: "#F7F3EE",
                border: "none", borderRadius: 10, padding: "18px 20px",
                fontSize: 16, fontFamily: "'Georgia', serif", fontWeight: "bold",
                cursor: "pointer", marginBottom: 10,
                boxShadow: "0 4px 16px rgba(45,74,62,0.3)",
              }}>
                🛏 {t("Encontrar Abrigo Esta Noite", "Find Me Shelter Tonight")}
              </button>

              <button onClick={() => setActiveTab("hotlines")} style={{
                width: "100%", background: "white", color: "#2D4A3E",
                border: "2px solid #2D4A3E", borderRadius: 10, padding: "14px 20px",
                fontSize: 14, fontFamily: "'Georgia', serif", fontWeight: "bold",
                cursor: "pointer", marginBottom: 22,
              }}>
                📞 {t("Falar com Alguém Agora", "Talk to Someone Right Now")}
              </button>

              {/* Guarantees */}
              <div style={{ background: "#EDE8E1", borderRadius: 10, padding: "16px", borderLeft: "4px solid #C4956A" }}>
                <div style={{ fontSize: 13, color: "#5A5147", lineHeight: 1.8 }}>
                  <strong style={{ color: "#2D4A3E" }}>{t("Sem identificação obrigatória", "No ID required")}</strong> {t("na maioria dos abrigos.", "at most shelters.")}<br />
                  <strong style={{ color: "#2D4A3E" }}>{t("Gratuito", "No cost")}</strong> — {t("abrigo e linhas de apoio.", "shelter and support lines.")}<br />
                  <strong style={{ color: "#2D4A3E" }}>{t("Sem julgamentos", "No judgment")}</strong> — {t("não tem de explicar nada.", "you don't have to explain anything.")}
                </div>
              </div>

              {/* Privacy note */}
              <div style={{ margin: "16px 0 0", padding: "12px 14px", background: "#FFF9F0", border: "1px solid #E8D5B7", borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: "#7A6E64", lineHeight: 1.6 }}>
                  <strong style={{ color: "#5A5147" }}>🔒 {t("A sua privacidade importa.", "Your privacy matters.")}</strong>{" "}
                  {t(
                    "Use o modo incógnito do browser para não deixar rasto. O botão SAIR AGORA (canto superior direito) redireciona imediatamente.",
                    "Use an incognito/private browser window to leave no trace. The EXIT NOW button (top right) redirects instantly."
                  )}
                </div>
              </div>

              {/* CIG resource note */}
              <div style={{ margin: "12px 0 0", padding: "12px 14px", background: "#E8F5EE", border: "1px solid #A3D4B5", borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: "#2D6B4A", lineHeight: 1.6 }}>
                  🌐 <strong>cig.gov.pt</strong> — {t(
                    "Guia oficial de recursos do Governo português. Lista todas as estruturas de apoio por distrito.",
                    "Official Portuguese Government resource guide. Lists all support structures by district."
                  )}{" "}
                  <a href="https://www.cig.gov.pt/area-portal-da-violencia/portal-violencia-domestica/guia-de-recursos/" target="_blank" rel="noreferrer" style={{ color: "#2D6B4A", fontWeight: "bold" }}>
                    {t("Ver guia →", "View guide →")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ SHELTERS ════ */}
        {activeTab === "shelters" && (
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: 18, fontWeight: "bold", color: "#2D4A3E", marginBottom: 4 }}>
              {t("Abrigos em Lisboa", "Shelters in Lisbon")}
            </div>
            <div style={{ fontSize: 12, color: "#7A6E64", marginBottom: 14, lineHeight: 1.6 }}>
              {t(
                "Em Portugal, os endereços das casas de abrigo são confidenciais por lei — para a sua proteção. O acesso é feito por telefone ou referência.",
                "In Portugal, shelter addresses are kept confidential by law — for your protection. Access is by phone or referral."
              )}
            </div>

            {SHELTERS.map((s, i) => (
              <div key={i} style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "#2D4A3E", flex: 1, paddingRight: 8 }}>{s.name}</div>
                  <span style={{ fontSize: 10, background: "#E8F5EE", color: "#2D6B4A", padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", fontWeight: "bold" }}>
                    {s.available}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#8B7355", fontStyle: "italic", marginBottom: 6 }}>{s.type}</div>
                <div style={{ fontSize: 12, color: "#5A5147", marginBottom: 8, lineHeight: 1.6 }}>
                  {lang === "pt" ? s.note : s.noteEn}<br />
                  <span style={{ color: "#7A6E64" }}>🔑 {t("Como aceder:", "How to access:")} {lang === "pt" ? s.via : s.viaEn}</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, background: "#EDE8E1", borderRadius: 20, padding: "2px 8px", color: "#5A5147" }}>
                    ✅ {t("Gratuito", "Free")}
                  </span>
                  {!s.id_required && (
                    <span style={{ fontSize: 11, background: "#EDE8E1", borderRadius: 20, padding: "2px 8px", color: "#5A5147" }}>
                      🪪 {t("Sem BI obrigatório", "No ID required")}
                    </span>
                  )}
                  {s.accepts_children && (
                    <span style={{ fontSize: 11, background: "#EDE8E1", borderRadius: 20, padding: "2px 8px", color: "#5A5147" }}>
                      👶 {t("Crianças bem-vindas", "Children welcome")}
                    </span>
                  )}
                </div>
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} style={{
                  display: "block", background: "#2D4A3E", color: "white",
                  textAlign: "center", padding: "13px", borderRadius: 8,
                  textDecoration: "none", fontSize: 14,
                  fontFamily: "'Georgia', serif", fontWeight: "bold",
                }}>
                  📞 {t("Ligar", "Call")} {s.phone}
                </a>
              </div>
            ))}

            {/* Police stations */}
            <div style={{ marginTop: 16, marginBottom: 8, fontSize: 14, fontWeight: "bold", color: "#2D4A3E" }}>
              🚔 {t("Esquadras de Polícia – Lisboa", "Police Stations – Lisbon")}
            </div>
            <div style={{ fontSize: 12, color: "#7A6E64", marginBottom: 10 }}>
              {t("Pode fazer queixa numa esquadra sem advogado. A violência doméstica é crime público em Portugal.", "You can report at any police station. Domestic violence is a public crime in Portugal.")}
            </div>
            {POLICE_STATIONS.map((p, i) => (
              <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#2D4A3E" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#7A6E64" }}>{p.note}</div>
                </div>
                <a href={`tel:${p.phone.replace(/\s/g, "")}`} style={{ background: "#EDE8E1", color: "#2D4A3E", padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontSize: 12, fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {p.phone}
                </a>
              </div>
            ))}

            {/* Hospitals */}
            <div style={{ marginTop: 16, marginBottom: 8, fontSize: 14, fontWeight: "bold", color: "#2D4A3E" }}>
              🏥 {t("Urgências Hospitalares – Lisboa", "Hospital A&E – Lisbon")}
            </div>
            {HOSPITALS.map((h, i) => (
              <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: "bold", color: "#2D4A3E" }}>{h.name}</div>
                  <div style={{ fontSize: 11, color: "#7A6E64" }}>{h.note} · {h.area}</div>
                </div>
                <a href={`tel:${h.phone.replace(/\s/g, "")}`} style={{ background: "#EDE8E1", color: "#2D4A3E", padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontSize: 12, fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {h.phone}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* ════ HOTLINES ════ */}
        {activeTab === "hotlines" && (
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: 18, fontWeight: "bold", color: "#2D4A3E", marginBottom: 4 }}>
              {t("Falar com Alguém", "Talk to Someone")}
            </div>
            <div style={{ fontSize: 13, color: "#7A6E64", marginBottom: 18, lineHeight: 1.6 }}>
              {t(
                "Todas as linhas são gratuitas e confidenciais. Pode desligar a qualquer momento. Ninguém vai julgar.",
                "All lines are free and confidential. You can hang up at any time. No one will judge you."
              )}
            </div>

            {HOTLINES.map((h, i) => (
              <div key={i} style={{ ...cardStyle, borderLeft: h.primary ? "4px solid #C4956A" : "1px solid #EDE8E1" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "#2D4A3E", flex: 1, paddingRight: 8 }}>
                    {lang === "pt" ? h.name : h.nameEn}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                    <span style={{ fontSize: 10, color: "#7A6E64", background: "#EDE8E1", padding: "2px 6px", borderRadius: 10, whiteSpace: "nowrap" }}>{h.available}</span>
                    <span style={{ fontSize: 10, color: "#7A6E64" }}>{h.lang}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#7A6E64", marginBottom: 10 }}>
                  {lang === "pt" ? h.note : h.noteEn}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {h.number && (
                    <a href={`tel:${h.number.replace(/[\s\-]/g, "")}`} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: h.primary ? "#2D4A3E" : "#EDE8E1",
                      color: h.primary ? "white" : "#2D4A3E",
                      padding: "11px 14px", borderRadius: 8,
                      textDecoration: "none", fontSize: 15,
                      fontFamily: "'Georgia', serif", fontWeight: "bold",
                    }}>
                      📞 {h.number}
                    </a>
                  )}
                  {h.sms && (
                    <div style={{ background: "#F7F3EE", border: "1px solid #D4C9BC", padding: "10px 14px", borderRadius: 8, fontSize: 13, color: "#2D4A3E", fontWeight: "bold" }}>
                      💬 {h.sms}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ background: "#FFF9F0", border: "1px solid #E8D5B7", borderRadius: 10, padding: "14px", marginTop: 4 }}>
              <div style={{ fontSize: 12, color: "#5A5147", lineHeight: 1.7 }}>
                <strong>{t("Se não consegue falar livremente:", "If you can't speak freely:")}</strong>{" "}
                {t(
                  "Use o SMS 3060 ou o chat online em apav.pt. Pode também ligar e ficar em silêncio — os operadores estão treinados para isso.",
                  "Use SMS 3060 or the online chat at apav.pt. You can also call and stay silent — operators are trained for this."
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════ SAFETY PLAN ════ */}
        {activeTab === "safety" && (
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: 18, fontWeight: "bold", color: "#2D4A3E", marginBottom: 4 }}>
              {t("Plano de Segurança Rápido", "Quick Safety Plan")}
            </div>
            <div style={{ fontSize: 13, color: "#7A6E64", marginBottom: 18, lineHeight: 1.6 }}>
              {t(
                "Se tiver um momento, reúna estas coisas. Até um ou dois itens ajudam. Marque à medida que vai recolhendo.",
                "If you have a moment, gather these things. Even one or two items helps. Check them off as you go."
              )}
            </div>

            {SAFETY_ITEMS.map(cat => (
              <div key={cat.category} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#2D4A3E", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{cat.icon}</span>
                  {lang === "pt" ? cat.category : cat.categoryEn}
                </div>
                {cat.items.map(item => {
                  const key = `${cat.category}:${item}`;
                  const checked = !!checkedItems[key];
                  return (
                    <div key={item} onClick={() => toggleCheck(cat.category, item)} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 12px", marginBottom: 6,
                      background: checked ? "#E8F5EE" : "white",
                      border: `1px solid ${checked ? "#A3D4B5" : "#EDE8E1"}`,
                      borderRadius: 8, cursor: "pointer", transition: "all 0.15s",
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                        border: `2px solid ${checked ? "#2D6B4A" : "#C4B8AD"}`,
                        background: checked ? "#2D6B4A" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {checked && <span style={{ color: "white", fontSize: 12 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 13, color: checked ? "#2D6B4A" : "#5A5147", textDecoration: checked ? "line-through" : "none", opacity: checked ? 0.7 : 1 }}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

            <div style={{ background: "#2D4A3E", borderRadius: 10, padding: "16px", marginTop: 4 }}>
              <div style={{ fontSize: 13, color: "#A8C4B8", lineHeight: 1.8, textAlign: "center", fontStyle: "italic" }}>
                {t(
                  "\"A sua segurança é mais importante do que qualquer documento ou objeto. É sempre certo partir sem nada, exceto você e os seus filhos.\"",
                  "\"Your safety matters more than any document or possession. It is always right to leave with nothing but yourself and your children.\""
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════ RESOURCES ════ */}
        {activeTab === "resources" && (
          <div style={{ padding: "20px" }}>
            <div style={{ fontSize: 18, fontWeight: "bold", color: "#2D4A3E", marginBottom: 16 }}>
              {t("Mais Apoio", "More Support")}
            </div>

            {[
              {
                title: t("Apoio Jurídico Gratuito", "Free Legal Help"),
                desc: t("APAV e advogados pro bono · ordens de afastamento em 48h em Portugal", "APAV & pro bono lawyers · restraining orders within 48h in Portugal"),
                icon: "⚖️",
                action: t("Contactar APAV", "Contact APAV"),
                href: "https://apav.pt",
              },
              {
                title: t("Imigrantes e Estrangeiras", "Immigrants & Foreign Nationals"),
                desc: t("Apoio específico para não-portuguesas · vistos · direitos legais", "Support for non-Portuguese · visas · legal rights in Portugal"),
                icon: "🌍",
                action: t("APAV SAFE", "APAV SAFE"),
                href: "https://precisodeajuda.pt",
              },
              {
                title: t("Apoio Financeiro de Emergência", "Emergency Financial Support"),
                desc: t("Segurança Social · adiantamento estatal para vítimas de violência doméstica", "Social Security · state advance payments for DV victims"),
                icon: "💼",
                action: t("Saber mais", "Learn more"),
                href: "https://www2.gov.pt/servicos/obter-informacoes-sobre-o-apoio-social-para-vitimas-de-violencia-domestica-casa-de-abrigo",
              },
              {
                title: t("Segurança Online e Digital", "Online & Digital Safety"),
                desc: t("Como remover spyware · proteger contas · apagar localização", "How to remove spyware · protect accounts · delete location history"),
                icon: "🔐",
                action: t("Guia de segurança", "Safety guide"),
                href: "https://www.techsafety.org",
              },
              {
                title: t("Apoio LGBTQI+", "LGBTQI+ Support"),
                desc: t("ILGA Portugal · apoio especializado · Lisboa · confidencial", "ILGA Portugal · specialist support · Lisbon · confidential"),
                icon: "🏳️‍🌈",
                action: t("ILGA Portugal", "ILGA Portugal"),
                href: "https://ilga-portugal.pt",
              },
              {
                title: t("Apoio para Crianças", "Support for Children"),
                desc: t("Psicólogos especializados em trauma infantil · IAC SOS Criança 217 931 617", "Child trauma psychologists · IAC SOS Criança 217 931 617"),
                icon: "🧸",
                action: t("IAC – SOS Criança", "IAC – SOS Criança"),
                href: "http://www.iacrianca.pt",
              },
              {
                title: t("Cruz Vermelha – Transporte", "Red Cross – Transport"),
                desc: t("A Cruz Vermelha Portuguesa oferece transporte para vítimas de violência doméstica", "Portuguese Red Cross provides transport for DV victims"),
                icon: "🚗",
                action: t("Cruz Vermelha PT", "Red Cross PT"),
                href: "https://www.cruzvermelha.pt",
              },
            ].map((r, i) => (
              <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "#2D4A3E", marginBottom: 3 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: "#7A6E64", lineHeight: 1.5, marginBottom: 8 }}>{r.desc}</div>
                  <a href={r.href} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#2D4A3E", fontWeight: "bold", textDecoration: "underline" }}>
                    {r.action} →
                  </a>
                </div>
              </div>
            ))}

            <div style={{ background: "#2D4A3E", borderRadius: 12, padding: "20px", marginTop: 8, textAlign: "center" }}>
              <div style={{ fontSize: 14, color: "#F7F3EE", fontWeight: "bold", marginBottom: 10 }}>
                {t("Lembre-se", "Remember")}
              </div>
              <div style={{ fontSize: 13, color: "#A8C4B8", lineHeight: 1.9 }}>
                {t(
                  "O que lhe está a acontecer não é culpa sua.\nMerece estar em segurança.\nA ajuda está sempre disponível.",
                  "What is happening to you is not your fault.\nYou deserve to be safe.\nHelp is always available."
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── PERSISTENT FOOTER ── */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430, background: "#2D4A3E",
        padding: "10px 16px", display: "flex", justifyContent: "space-between",
        alignItems: "center", boxShadow: "0 -2px 12px rgba(0,0,0,0.2)",
        gap: 10,
      }}>
        <a href="tel:800202148" style={{ color: "#F7F3EE", textDecoration: "none" }}>
          <div style={{ fontSize: 10, opacity: 0.7 }}>{t("Linha Verde VD", "DV Helpline")}</div>
          <div style={{ fontSize: 13, fontWeight: "bold" }}>800 202 148</div>
        </a>
        <a href="tel:112" style={{ background: "#8B2635", color: "white", padding: "8px 14px", borderRadius: 6, textDecoration: "none", fontSize: 13, fontWeight: "bold", fontFamily: "'Georgia', serif" }}>
          🆘 112
        </a>
        <a href="tel:116006" style={{ color: "#F7F3EE", textDecoration: "none", textAlign: "right" }}>
          <div style={{ fontSize: 10, opacity: 0.7 }}>APAV</div>
          <div style={{ fontSize: 13, fontWeight: "bold" }}>116 006</div>
        </a>
      </div>
    </div>
  );
}
