import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import { useState } from "react";

import suryaLogo from "../../assets/surya-ghar-logo.png";

type Props = {
  open: boolean;
  onClose: () => void;
};

type LanguageKey = "en" | "hi" | "mr";
type ViewKey = "overview" | "guide";
type ToneKey = "success" | "warning" | "error";
type EligibilityMessageKey = "fill" | "ownOnly" | "roofReview" | "likely";

const copy = {
  en: {
    badge: "Citizen Information Guide",
    subtitle:
      "Residential rooftop solar assistance, subsidy awareness, and application support.",
    notice:
      "Use the official government portal for registration, tracking, and subsidy status. Netson Solar can support planning and documentation.",
    advisoryLabel: "Public Advisory",
    portalCta: "Open Official Portal",
    issuer: "Ministry of New and Renewable Energy | Government of India",
    overviewTab: "Scheme Overview",
    guideTab: "Application Guide",
    guideTitle: "Citizen Service Guide",
    guideDescription:
      "Follow this sequence to complete registration, installation, inspection, and subsidy claim smoothly.",
    guideSteps: [
      "Register on the PM Surya Ghar portal using your state, DISCOM, and consumer details.",
      "Submit the rooftop solar application with the proposed system capacity.",
      "Select an approved vendor and confirm the installation scope.",
      "Complete installation and upload commissioning details on the portal.",
      "Await inspection, technical approval, and related net-metering clearance.",
      "Receive subsidy in the linked bank account after final approval.",
    ],
    requiredDocsTitle: "Required Documents",
    requiredDocs: [
      "Aadhaar or identity proof",
      "Recent electricity bill",
      "Ownership or residence proof as applicable",
      "Bank account details for subsidy transfer",
    ],
    importantNotesTitle: "Important Notes",
    importantNotes: [
      "Subsidy depends on approved system capacity and applicable government norms.",
      "Approval timelines may vary by DISCOM and state-level process.",
      "The estimate below is indicative and should be validated through a site survey.",
    ],
    aboutTitle: "About the Scheme",
    about:
      "PM Surya Ghar: Muft Bijli Yojana supports residential rooftop solar adoption through subsidy assistance and a structured approval process.",
    benefitsTitle: "Key Benefits",
    benefits: [
      "Financial support for eligible residential systems",
      "Reduced monthly electricity expenses",
      "Cleaner household energy usage",
    ],
    eligibilityTitle: "Basic Eligibility",
    eligibility: [
      "Residential consumer with a valid electricity connection",
      "Homeowner or eligible residential applicant",
      "Adequate rooftop space and technical feasibility",
    ],
    highlightsTitle: "Before You Apply",
    highlights: [
      "Keep your consumer number and latest electricity bill ready",
      "Finalize system size after site assessment and vendor guidance",
      "Track approvals and subsidy progress on the official portal",
    ],
    toolsTitle: "Citizen Utility Tools",
    estimateTitle: "Indicative Solar Estimate",
    estimateLabel: "Average monthly bill (Rs)",
    estimateHelper:
      "Enter your usual monthly bill to get a rough rooftop system estimate.",
    estimateAction: "Generate Estimate",
    estimateSystemLabel: "Recommended System",
    estimateSubsidyLabel: "Indicative Subsidy",
    estimateSavingLabel: "Approx. Monthly Savings",
    estimateNote:
      "Planning aid only. Final system sizing depends on roof area, load, and site conditions.",
    eligibilityToolTitle: "Eligibility Self-Check",
    eligibilityHelper:
      "Answer these basic checks for a quick preliminary view.",
    ownershipLabel: "Property status",
    roofLabel: "Roof condition",
    ownershipOptions: [
      { value: "own", label: "Owned residence" },
      { value: "rent", label: "Rented / leased" },
    ],
    roofOptions: [
      { value: "concrete", label: "RCC / concrete roof" },
      { value: "metal", label: "Metal / sheet roof" },
      { value: "na", label: "Not sure" },
    ],
    check: "Run Check",
    fill: "Complete both fields to continue.",
    ownOnly:
      "Owned residential properties are usually preferred for direct eligibility.",
    roofReview:
      "A site survey is recommended to confirm roof suitability.",
    likely: "You appear broadly eligible based on these inputs.",
    footerNote:
      "This section is a facilitation interface. Final registration, approval, inspection, and subsidy release are handled on the official portal and by the concerned DISCOM.",
  },
  hi: {
    badge: "नागरिक सूचना मार्गदर्शिका",
    subtitle: "घरेलू रूफटॉप सोलर, सब्सिडी जानकारी और आवेदन सहायता।",
    notice:
      "पंजीकरण, ट्रैकिंग और सब्सिडी स्थिति के लिए आधिकारिक सरकारी पोर्टल का ही उपयोग करें। नेटसन सोलर योजना और दस्तावेज़ी सहायता दे सकता है।",
    advisoryLabel: "महत्वपूर्ण सूचना",
    portalCta: "आधिकारिक पोर्टल खोलें",
    issuer: "नवीन और नवीकरणीय ऊर्जा मंत्रालय | भारत सरकार",
    overviewTab: "योजना परिचय",
    guideTab: "आवेदन मार्गदर्शिका",
    guideTitle: "आवेदन सेवा मार्गदर्शिका",
    guideDescription:
      "पंजीकरण, स्थापना, निरीक्षण और सब्सिडी दावे की प्रक्रिया पूरी करने के लिए यह क्रम अपनाएँ।",
    guideSteps: [
      "अपने राज्य, डिस्कॉम और उपभोक्ता विवरण के साथ पीएम सूर्य घर पोर्टल पर पंजीकरण करें।",
      "प्रस्तावित सिस्टम क्षमता के साथ रूफटॉप सोलर आवेदन जमा करें।",
      "स्वीकृत विक्रेता चुनें और स्थापना का दायरा तय करें।",
      "स्थापना पूरी होने के बाद कमीशनिंग विवरण पोर्टल पर अपलोड करें।",
      "निरीक्षण, तकनीकी स्वीकृति और संबंधित नेट-मीटरिंग मंजूरी की प्रतीक्षा करें।",
      "अंतिम स्वीकृति के बाद सब्सिडी लिंक किए गए बैंक खाते में प्राप्त करें।",
    ],
    requiredDocsTitle: "आवश्यक दस्तावेज़",
    requiredDocs: [
      "आधार या पहचान प्रमाण",
      "हालिया बिजली बिल",
      "आवश्यकतानुसार स्वामित्व या निवास प्रमाण",
      "सब्सिडी हस्तांतरण के लिए बैंक खाते का विवरण",
    ],
    importantNotesTitle: "महत्वपूर्ण बातें",
    importantNotes: [
      "सब्सिडी स्वीकृत सिस्टम क्षमता और लागू सरकारी नियमों पर निर्भर करती है।",
      "मंजूरी की समय-सीमा डिस्कॉम और राज्य प्रक्रिया के अनुसार अलग हो सकती है।",
      "नीचे दिया गया अनुमान संकेतात्मक है और इसे साइट सर्वे से सत्यापित करना चाहिए।",
    ],
    aboutTitle: "योजना के बारे में",
    about:
      "पीएम सूर्य घर योजना घरेलू उपभोक्ताओं को रूफटॉप सोलर अपनाने के लिए सब्सिडी सहायता और तय प्रक्रिया प्रदान करती है।",
    benefitsTitle: "मुख्य लाभ",
    benefits: [
      "पात्र घरों के लिए वित्तीय सहायता",
      "मासिक बिजली बिल में कमी",
      "स्वच्छ और टिकाऊ ऊर्जा उपयोग",
    ],
    eligibilityTitle: "मूल पात्रता",
    eligibility: [
      "मान्य बिजली कनेक्शन वाला घरेलू उपभोक्ता",
      "स्वामित्व वाला घर या पात्र आवासीय उपयोग",
      "पर्याप्त छत और तकनीकी उपयुक्तता",
    ],
    highlightsTitle: "आवेदन से पहले",
    highlights: [
      "उपभोक्ता संख्या और हालिया बिजली बिल तैयार रखें",
      "साइट सर्वे और सलाह के बाद ही सिस्टम आकार तय करें",
      "आधिकारिक पोर्टल पर अनुमोदन और सब्सिडी स्थिति ट्रैक करें",
    ],
    toolsTitle: "नागरिक उपयोगी उपकरण",
    estimateTitle: "संकेतात्मक सोलर अनुमान",
    estimateLabel: "औसत मासिक बिल (रु.)",
    estimateHelper:
      "अपने सामान्य मासिक बिल के आधार पर प्रारंभिक सोलर अनुमान प्राप्त करें।",
    estimateAction: "अनुमान प्राप्त करें",
    estimateSystemLabel: "अनुशंसित सिस्टम",
    estimateSubsidyLabel: "संकेतात्मक सब्सिडी",
    estimateSavingLabel: "अनुमानित मासिक बचत",
    estimateNote:
      "यह केवल योजना बनाने में सहायता है। अंतिम सिस्टम आकार छत, लोड और साइट की स्थिति पर निर्भर करेगा।",
    eligibilityToolTitle: "पात्रता स्वयं जांच",
    eligibilityHelper:
      "त्वरित प्रारंभिक जानकारी के लिए नीचे दिए गए मूल विकल्प चुनें।",
    ownershipLabel: "संपत्ति स्थिति",
    roofLabel: "छत की स्थिति",
    ownershipOptions: [
      { value: "own", label: "स्वामित्व वाला घर" },
      { value: "rent", label: "किराये / लीज पर" },
    ],
    roofOptions: [
      { value: "concrete", label: "आरसीसी / कंक्रीट छत" },
      { value: "metal", label: "मेटल / शीट छत" },
      { value: "na", label: "पक्का नहीं" },
    ],
    check: "जांच करें",
    fill: "आगे बढ़ने के लिए दोनों फ़ील्ड भरें।",
    ownOnly:
      "सीधी पात्रता के लिए स्वामित्व वाला आवास सामान्यतः प्राथमिक होता है।",
    roofReview: "छत की उपयुक्तता की पुष्टि के लिए साइट सर्वे उचित रहेगा।",
    likely: "दिए गए विवरण के आधार पर आप सामान्यतः पात्र दिखते हैं।",
    footerNote:
      "यह अनुभाग केवल सुविधा के लिए है। अंतिम पंजीकरण, अनुमोदन, निरीक्षण और सब्सिडी जारी करने की प्रक्रिया आधिकारिक पोर्टल और संबंधित डिस्कॉम द्वारा की जाती है।",
  },
  mr: {
    badge: "नागरिक माहिती मार्गदर्शक",
    subtitle: "घरगुती रूफटॉप सोलर, अनुदान माहिती आणि अर्ज सहाय्य.",
    notice:
      "नोंदणी, ट्रॅकिंग आणि अनुदान स्थितीसाठी अधिकृत सरकारी पोर्टलच वापरा. नेटसन सोलर नियोजन आणि कागदपत्र सहाय्य देऊ शकते.",
    advisoryLabel: "महत्त्वाची सूचना",
    portalCta: "अधिकृत पोर्टल उघडा",
    issuer: "नवीन आणि नवीकरणीय ऊर्जा मंत्रालय | भारत सरकार",
    overviewTab: "योजना परिचय",
    guideTab: "अर्ज मार्गदर्शक",
    guideTitle: "अर्ज सेवा मार्गदर्शक",
    guideDescription:
      "नोंदणी, बसवणी, तपासणी आणि अनुदान दावा पूर्ण करण्यासाठी हा क्रम वापरा.",
    guideSteps: [
      "आपले राज्य, डिस्कॉम आणि ग्राहक तपशील वापरून पीएम सूर्य घर पोर्टलवर नोंदणी करा.",
      "प्रस्तावित सिस्टीम क्षमतेसह रूफटॉप सोलर अर्ज सादर करा.",
      "मान्यताप्राप्त विक्रेता निवडा आणि बसवणीचा व्याप निश्चित करा.",
      "बसवणी पूर्ण झाल्यावर कमिशनिंगची माहिती पोर्टलवर अपलोड करा.",
      "तपासणी, तांत्रिक मंजुरी आणि संबंधित नेट-मीटरिंग मंजुरीची प्रतीक्षा करा.",
      "अंतिम मंजुरीनंतर जोडलेल्या बँक खात्यात अनुदान मिळवा.",
    ],
    requiredDocsTitle: "आवश्यक कागदपत्रे",
    requiredDocs: [
      "आधार किंवा ओळखपत्र",
      "अलीकडील वीज बिल",
      "लागू असल्यास मालकी किंवा निवासाचा पुरावा",
      "अनुदान हस्तांतरणासाठी बँक खात्याचा तपशील",
    ],
    importantNotesTitle: "महत्त्वाच्या सूचना",
    importantNotes: [
      "अनुदान मंजूर सिस्टीम क्षमता आणि लागू सरकारी नियमांवर अवलंबून असते.",
      "मंजुरीसाठी लागणारा वेळ डिस्कॉम आणि राज्यस्तरीय प्रक्रियेनुसार बदलू शकतो.",
      "खालील अंदाज फक्त सूचक आहे आणि साइट सर्व्हेद्वारे तपासणे आवश्यक आहे.",
    ],
    aboutTitle: "योजनेबद्दल",
    about:
      "पीएम सूर्य घर योजना घरगुती ग्राहकांना रूफटॉप सोलर स्वीकारण्यासाठी अनुदान सहाय्य आणि निश्चित प्रक्रिया देते.",
    benefitsTitle: "मुख्य फायदे",
    benefits: [
      "पात्र घरांसाठी आर्थिक सहाय्य",
      "मासिक वीज बिलात बचत",
      "स्वच्छ आणि टिकाऊ ऊर्जा वापर",
    ],
    eligibilityTitle: "मूलभूत पात्रता",
    eligibility: [
      "वैध वीज जोडणी असलेला घरगुती ग्राहक",
      "स्वतःचे घर किंवा पात्र निवासी वापर",
      "पुरेशी छत जागा आणि तांत्रिक योग्यता",
    ],
    highlightsTitle: "अर्ज करण्यापूर्वी",
    highlights: [
      "ग्राहक क्रमांक आणि अलीकडील वीज बिल तयार ठेवा",
      "साइट सर्व्हे आणि सल्ल्यानंतरच प्रणाली क्षमता ठरवा",
      "अधिकृत पोर्टलवर मंजुरी आणि अनुदान प्रगती तपासा",
    ],
    toolsTitle: "नागरिक उपयोगी साधने",
    estimateTitle: "संकेतात्मक सोलर अंदाज",
    estimateLabel: "सरासरी मासिक बिल (रु.)",
    estimateHelper:
      "तुमचे सामान्य मासिक बिल वापरून प्राथमिक सोलर अंदाज घ्या.",
    estimateAction: "अंदाज तयार करा",
    estimateSystemLabel: "सुचवलेली प्रणाली",
    estimateSubsidyLabel: "संकेतात्मक अनुदान",
    estimateSavingLabel: "अंदाजे मासिक बचत",
    estimateNote:
      "हे फक्त नियोजनासाठी सहाय्य आहे. अंतिम प्रणाली आकार छत, लोड आणि साइट परिस्थितीवर अवलंबून असेल.",
    eligibilityToolTitle: "पात्रता स्वतः तपासा",
    eligibilityHelper:
      "त्वरित प्राथमिक माहितीसाठी खालील मूलभूत पर्याय निवडा.",
    ownershipLabel: "मालमत्ता स्थिती",
    roofLabel: "छत स्थिती",
    ownershipOptions: [
      { value: "own", label: "स्वतःचे घर" },
      { value: "rent", label: "भाडे / लीज" },
    ],
    roofOptions: [
      { value: "concrete", label: "आरसीसी / काँक्रीट छत" },
      { value: "metal", label: "मेटल / शीट छत" },
      { value: "na", label: "निश्चित नाही" },
    ],
    check: "तपासा",
    fill: "पुढे जाण्यासाठी दोन्ही फील्ड भरा.",
    ownOnly:
      "थेट पात्रतेसाठी स्वतःचे निवासी घर सामान्यतः प्राधान्याने पाहिले जाते.",
    roofReview:
      "छताची उपयुक्तता निश्चित करण्यासाठी साइट सर्व्हे करणे योग्य राहील.",
    likely: "दिलेल्या माहितीनुसार आपण साधारणपणे पात्र दिसता.",
    footerNote:
      "हा विभाग केवळ सुलभतेसाठी आहे. अंतिम नोंदणी, मंजुरी, तपासणी आणि अनुदान वितरण ही प्रक्रिया अधिकृत पोर्टल आणि संबंधित डिस्कॉममार्फत केली जाते.",
  },
} as const;

const languageOptions = [
  { value: "en", label: "English", badge: "EN", accent: "#1D4ED8", surface: "#DBEAFE" },
  { value: "hi", label: "हिंदी", badge: "हि", accent: "#C2410C", surface: "#FFEDD5" },
  { value: "mr", label: "मराठी", badge: "म", accent: "#15803D", surface: "#DCFCE7" },
] as const;

const localeMap: Record<LanguageKey, string> = {
  en: "en-IN",
  hi: "hi-IN-u-nu-deva",
  mr: "mr-IN-u-nu-deva",
};

const toneStyles = {
  success: {
    backgroundColor: "#ECFDF3",
    borderColor: "#16A34A",
    color: "#166534",
  },
  warning: {
    backgroundColor: "#FFF7ED",
    borderColor: "#F59E0B",
    color: "#9A3412",
  },
  error: {
    backgroundColor: "#FEF2F2",
    borderColor: "#DC2626",
    color: "#991B1B",
  },
} as const;

const cardSx = {
  p: { xs: 2.25, md: 3 },
  borderRadius: 3,
  border: "1px solid #D8E4F0",
  boxShadow: "0 14px 32px rgba(15, 23, 42, 0.06)",
  backgroundColor: "#FFFFFF",
};

const bulletSx = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: "#1D4ED8",
  mt: "7px",
  flexShrink: 0,
};

const rowSx = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1.25,
};

const SuryaGharDialog = ({ open, onClose }: Props) => {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [view, setView] = useState<ViewKey>("overview");
  const [bill, setBill] = useState("");
  const [ownership, setOwnership] = useState("");
  const [roof, setRoof] = useState("");
  const [estimate, setEstimate] = useState<{
    systemSize: number;
    subsidy: number;
    saving: number;
  } | null>(null);
  const [eligibility, setEligibility] = useState<{
    tone: ToneKey;
    messageKey: EligibilityMessageKey;
  } | null>(null);

  const t = copy[language];
  const locale = localeMap[language];

  const formatDecimal = (value: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
      maximumFractionDigits: 1,
    }).format(value);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const calculateEstimate = () => {
    const value = Number(bill);
    if (!value || value <= 0) {
      setEstimate(null);
      return;
    }

    const systemSize = Math.max(1, Number((value / 1500).toFixed(1)));
    const subsidy = Math.min(78000, Math.round(systemSize * 20000));
    const saving = Math.round(value * 0.8);

    setEstimate({
      systemSize,
      subsidy,
      saving,
    });
  };

  const checkEligibility = () => {
    if (!ownership || !roof) {
      setEligibility({ tone: "error", messageKey: "fill" });
      return;
    }
    if (ownership !== "own") {
      setEligibility({ tone: "warning", messageKey: "ownOnly" });
      return;
    }
    if (roof === "na") {
      setEligibility({ tone: "warning", messageKey: "roofReview" });
      return;
    }
    setEligibility({ tone: "success", messageKey: "likely" });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: "#F4F8FC",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            height: 6,
            background:
              "linear-gradient(90deg, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)",
          }}
        />

        <Box
          sx={{
            px: { xs: 2.25, md: 4 },
            py: { xs: 2.5, md: 3.5 },
            background: "linear-gradient(180deg, #EEF5FF 0%, #F8FBFF 100%)",
            borderBottom: "1px solid #D8E4F0",
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "#FFFFFF",
              border: "1px solid #D8E4F0",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2.5}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box
                component="img"
                src={suryaLogo}
                alt="PM Surya Ghar"
                sx={{
                  width: { xs: 64, md: 78 },
                  height: { xs: 64, md: 78 },
                  objectFit: "contain",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 2.5,
                  p: 1,
                  border: "1px solid #D8E4F0",
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    color: "#1D4ED8",
                    mb: 0.75,
                  }}
                >
                  {t.badge}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A" }}>
                  PM Surya Ghar: Muft Bijli Yojana
                </Typography>
                <Typography sx={{ color: "#334155", mt: 0.75, maxWidth: 700, lineHeight: 1.7 }}>
                  {t.subtitle}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1.5, color: "#475569" }}>
                  {t.issuer}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={0.85} flexWrap="wrap" useFlexGap>
              {languageOptions.map((option) => (
                <Button
                  key={option.value}
                  size="small"
                  onClick={() => setLanguage(option.value)}
                  sx={{
                    minWidth: { xs: 94, sm: 104 },
                    px: { xs: 1.05, sm: 1.15 },
                    py: 0.55,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    justifyContent: "flex-start",
                    color: language === option.value ? "#FFFFFF" : "#0F172A",
                    background:
                      language === option.value
                        ? "linear-gradient(135deg, #0F172A 0%, #1D4ED8 100%)"
                        : "#FFFFFF",
                    border:
                      language === option.value
                        ? "1px solid rgba(15, 23, 42, 0.08)"
                        : "1px solid #CBD5E1",
                    boxShadow:
                      language === option.value
                        ? "0 10px 22px rgba(29, 78, 216, 0.18)"
                        : "0 4px 10px rgba(148, 163, 184, 0.12)",
                    "&:hover": {
                      background:
                        language === option.value
                          ? "linear-gradient(135deg, #0F172A 0%, #1D4ED8 100%)"
                          : "#F8FAFC",
                    },
                  }}
                >
                  <Stack direction="row" spacing={0.8} alignItems="center">
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        fontSize: option.badge.length > 1 ? "0.62rem" : "0.74rem",
                        fontWeight: 800,
                        lineHeight: 1,
                        flexShrink: 0,
                        color: language === option.value ? "#FFFFFF" : option.accent,
                        backgroundColor:
                          language === option.value
                            ? "rgba(255, 255, 255, 0.18)"
                            : option.surface,
                        border:
                          language === option.value
                            ? "1px solid rgba(255, 255, 255, 0.24)"
                            : `1px solid ${option.surface}`,
                      }}
                    >
                      {option.badge}
                    </Box>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: { xs: "0.78rem", sm: "0.82rem" },
                        fontWeight: 700,
                        lineHeight: 1.15,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Stack>
                </Button>
              ))}
            </Stack>
          </Stack>

          <Paper
            sx={{
              mt: 3,
              p: { xs: 2, md: 2.25 },
              borderRadius: 3,
              border: "1px solid #D8E4F0",
              backgroundColor: "#FFFFFF",
              boxShadow: "none",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 800, color: "#1E3A8A", mb: 0.5 }}>
                  {t.advisoryLabel}
                </Typography>
                <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.75 }}>
                  {t.notice}
                </Typography>
              </Box>

              <Button
                component="a"
                href="https://pmsuryaghar.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                endIcon={<LaunchIcon />}
                sx={{
                  backgroundColor: "#166534",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "none",
                }}
              >
                {t.portalCta}
              </Button>
            </Stack>
          </Paper>
        </Box>

        <Box sx={{ px: { xs: 2.25, md: 4 }, py: { xs: 2.5, md: 3.5 } }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ mb: 3 }}>
            {[
              { value: "overview" as ViewKey, label: t.overviewTab },
              { value: "guide" as ViewKey, label: t.guideTab },
            ].map((item) => (
              <Button
                key={item.value}
                onClick={() => setView(item.value)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 700,
                  border: "1px solid #CBD5E1",
                  color: view === item.value ? "#FFFFFF" : "#334155",
                  backgroundColor: view === item.value ? "#0F172A" : "#FFFFFF",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {view === "guide" ? (
            <Paper sx={cardSx}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 1 }}>
                {t.guideTitle}
              </Typography>
              <Typography sx={{ color: "#475569", lineHeight: 1.75, mb: 3 }}>
                {t.guideDescription}
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" }, gap: 3 }}>
                <Stack spacing={1.25}>
                  {t.guideSteps.map((step, index) => (
                    <Box
                      key={step}
                      sx={{
                        p: 1.75,
                        borderRadius: 2.5,
                        border: "1px solid #D8E4F0",
                        backgroundColor: "#F8FBFF",
                        ...rowSx,
                      }}
                    >
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#E8F0FE",
                          color: "#1D4ED8",
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.75 }}>
                        {step}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Stack spacing={2.25}>
                  <Paper variant="outlined" sx={{ p: 2.25, borderRadius: 2.5, borderColor: "#D8E4F0" }}>
                    <Typography sx={{ fontWeight: 800, color: "#0F172A", mb: 1.5 }}>
                      {t.requiredDocsTitle}
                    </Typography>
                    <Stack spacing={1.1}>
                      {t.requiredDocs.map((doc) => (
                        <Box key={doc} sx={rowSx}>
                          <Box sx={bulletSx} />
                          <Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.7 }}>
                            {doc}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>

                  <Paper variant="outlined" sx={{ p: 2.25, borderRadius: 2.5, borderColor: "#D8E4F0" }}>
                    <Typography sx={{ fontWeight: 800, color: "#0F172A", mb: 1.5 }}>
                      {t.importantNotesTitle}
                    </Typography>
                    <Stack spacing={1.1}>
                      {t.importantNotes.map((note) => (
                        <Box key={note} sx={rowSx}>
                          <Box sx={{ ...bulletSx, backgroundColor: "#166534" }} />
                          <Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.7 }}>
                            {note}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Stack>
              </Box>
            </Paper>
          ) : (
            <Box>
              <Paper sx={cardSx}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
                    gap: 3,
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 1 }}>
                      {t.aboutTitle}
                    </Typography>
                    <Typography sx={{ color: "#475569", lineHeight: 1.8 }}>
                      {t.about}
                    </Typography>
                  </Box>

                  <Paper variant="outlined" sx={{ p: 2.25, borderRadius: 2.5, borderColor: "#D8E4F0", backgroundColor: "#F8FBFF" }}>
                    <Typography sx={{ fontWeight: 800, color: "#0F172A", mb: 1.5 }}>
                      {t.highlightsTitle}
                    </Typography>
                    <Stack spacing={1.1}>
                      {t.highlights.map((item) => (
                        <Box key={item} sx={rowSx}>
                          <Box sx={bulletSx} />
                          <Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.75 }}>
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>
                </Box>
              </Paper>

              <Box sx={{ mt: 3, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                <Paper sx={cardSx}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 1.5 }}>
                    {t.benefitsTitle}
                  </Typography>
                  <Stack spacing={1.2}>
                    {t.benefits.map((item) => (
                      <Box key={item} sx={rowSx}>
                        <Box sx={{ ...bulletSx, backgroundColor: "#166534" }} />
                        <Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.75 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                <Paper sx={cardSx}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 1.5 }}>
                    {t.eligibilityTitle}
                  </Typography>
                  <Stack spacing={1.2}>
                    {t.eligibility.map((item) => (
                      <Box key={item} sx={rowSx}>
                        <Box sx={{ ...bulletSx, backgroundColor: "#F59E0B" }} />
                        <Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.75 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Box>

              <Divider sx={{ my: 3, borderColor: "#D8E4F0" }} />

              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 2 }}>
                {t.toolsTitle}
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 3 }}>
                <Paper sx={cardSx}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 0.75 }}>
                    {t.estimateTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.7, mb: 2 }}>
                    {t.estimateHelper}
                  </Typography>
                  <TextField
                    label={t.estimateLabel}
                    size="small"
                    fullWidth
                    value={bill}
                    onChange={(event) => setBill(event.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={calculateEstimate}
                    sx={{ mt: 1.5, backgroundColor: "#166534", fontWeight: 700, textTransform: "none", boxShadow: "none" }}
                  >
                    {t.estimateAction}
                  </Button>

                  {estimate && (
                    <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 1.25 }}>
                      {[
                        {
                          label: t.estimateSystemLabel,
                          value: `${formatDecimal(estimate.systemSize)} kW`,
                        },
                        { label: t.estimateSubsidyLabel, value: formatCurrency(estimate.subsidy) },
                        { label: t.estimateSavingLabel, value: formatCurrency(estimate.saving) },
                      ].map((item) => (
                        <Paper key={item.label} variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: "#D8E4F0", backgroundColor: "#F8FBFF" }}>
                          <Typography variant="caption" sx={{ display: "block", color: "#64748B", mb: 0.5 }}>
                            {item.label}
                          </Typography>
                          <Typography sx={{ fontWeight: 800, color: "#0F172A" }}>
                            {item.value}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  )}

                  <Typography variant="body2" sx={{ color: "#64748B", lineHeight: 1.7, mt: 1.75 }}>
                    {t.estimateNote}
                  </Typography>
                </Paper>

                <Paper sx={cardSx}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", mb: 0.75 }}>
                    {t.eligibilityToolTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.7, mb: 2 }}>
                    {t.eligibilityHelper}
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      select
                      size="small"
                      label={t.ownershipLabel}
                      value={ownership}
                      onChange={(event) => setOwnership(event.target.value)}
                    >
                      {t.ownershipOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      size="small"
                      label={t.roofLabel}
                      value={roof}
                      onChange={(event) => setRoof(event.target.value)}
                    >
                      {t.roofOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Button
                      variant="contained"
                      onClick={checkEligibility}
                      sx={{ alignSelf: "flex-start", backgroundColor: "#0F172A", fontWeight: 700, textTransform: "none", boxShadow: "none" }}
                    >
                      {t.check}
                    </Button>

                    {eligibility && (
                      <Box sx={{ p: 1.5, borderRadius: 2, border: "1px solid", ...toneStyles[eligibility.tone] }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                          {t[eligibility.messageKey]}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Paper>
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 3, borderColor: "#D8E4F0" }} />

          <Typography variant="body2" sx={{ color: "#526176", lineHeight: 1.75 }}>
            {t.footerNote}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SuryaGharDialog;
