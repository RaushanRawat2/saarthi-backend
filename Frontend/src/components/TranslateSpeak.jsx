import React, { useEffect, useState, useRef } from "react";

/**
 * TranslateSpeak
 * - Translates English text to target language (hi / ne / en) using LibreTranslate
 * - Speaks translated text using browser SpeechSynthesis
 *
 * Usage: <TranslateSpeak />
 */

const LIBRE_TRANSLATE_URL = "https://libretranslate.com/translate"; // public instance

const LANG_MAP = {
  hi: { label: "Hindi", ttsCode: "hi-IN" },
  ne: { label: "Nepali", ttsCode: "ne-NP" },
  en: { label: "English", ttsCode: "en-US" },
};

export default function TranslateSpeak() {
  const [inputText, setInputText] = useState(
    "Rumtek Monastery is the seat of the Karmapa lineage and offers beautiful Tibetan architecture."
  );
  const [targetLang, setTargetLang] = useState("hi"); // "hi" | "ne" | "en"
  const [translatedText, setTranslatedText] = useState("");
  const [translating, setTranslating] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);
  const voicesReadyRef = useRef(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  // load voices (some browsers populate asynchronously)
  useEffect(() => {
    function loadVoices() {
      const voices = window.speechSynthesis.getVoices() || [];
      setAvailableVoices(voices);
      voicesReadyRef.current = true;
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    // cleanup utter on unmount
    return () => {
      if (utterRef.current) {
        utterRef.current.onend = null;
        utterRef.current.onerror = null;
        utterRef.current = null;
      }
    };
  }, []);

  // pick best available voice for the targetLang (best-effort)
  const pickVoiceForLang = (langCode) => {
    if (!availableVoices || availableVoices.length === 0) return null;
    // prefer voices whose lang starts with langCode (e.g., 'hi' or 'hi-IN')
    const exact = availableVoices.find((v) => v.lang?.toLowerCase().startsWith(langCode.split("-")[0]));
    if (exact) return exact;
    // else prefer voice whose name contains a language name
    const nameMatch = availableVoices.find((v) =>
      v.name?.toLowerCase().includes(langCode.split("-")[0])
    );
    if (nameMatch) return nameMatch;
    // fallback to first voice that is not default 'en-US' probably
    return availableVoices[0] || null;
  };

  // Translate using LibreTranslate public instance (no API key for basic usage)
  const translate = async (text, target) => {
    // if target is english, no translation needed
    if (!text || target === "en") return text;
    setError(null);
    setTranslating(true);
    try {
      const res = await fetch(LIBRE_TRANSLATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: target,
          format: "text",
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Translate API error: ${res.status} ${txt}`);
      }
      const json = await res.json();
      // LibreTranslate returns { translatedText: "..." } (some instances return different keys)
      const translated = json.translatedText ?? json.translated_text ?? json.result ?? "";
      setTranslatedText(translated);
      return translated;
    } catch (err) {
      console.error("Translation failed:", err);
      setError("Translation failed. Try again or check your network.");
      // fallback: return original text so speech still works
      return text;
    } finally {
      setTranslating(false);
    }
  };

  // Speak function: translates then speaks
  const handleSpeak = async () => {
    if (!inputText || inputText.trim().length === 0) return;
    // stop any previous speech
    window.speechSynthesis.cancel();
    setSpeaking(true);
    try {
      const translated = await translate(inputText, targetLang);
      // create utterance
      const utter = new SpeechSynthesisUtterance(translated);
      utterRef.current = utter;

      // set language tag
      const ttsLang = LANG_MAP[targetLang]?.ttsCode ?? "en-US";
      utter.lang = ttsLang;

      // pick a voice (best-effort)
      const chosenVoice = pickVoiceForLang(ttsLang);
      if (chosenVoice) {
        utter.voice = chosenVoice;
      }

      // optional voice tuning
      utter.rate = 1; // 0.8 - 1.3 typical
      utter.pitch = 1;
      utter.volume = 1;

      utter.onend = () => {
        setSpeaking(false);
      };
      utter.onerror = (e) => {
        console.error("SpeechSynthesis error:", e);
        setSpeaking(false);
        setError("Speech playback failed on this browser/device.");
      };

      // speak
      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.error("Speak failed:", err);
      setError("Failed to speak. See console for details.");
      setSpeaking(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  // Quick helper to show voice availability
  const ttsAvailable = () => {
    const ttsLang = LANG_MAP[targetLang]?.ttsCode ?? "en-US";
    if (!availableVoices || availableVoices.length === 0) return false;
    return !!availableVoices.find((v) => v.lang?.toLowerCase().startsWith(ttsLang.split("-")[0]));
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 18, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h2 style={{ marginBottom: 6 }}>Real-time Translate → Speak</h2>
      <p style={{ color: "#555", marginTop: 0 }}>
        Enter English text, choose language, then click <strong>Listen</strong>. Uses LibreTranslate + browser TTS.
      </p>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter English text..."
        rows={6}
        style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 15 }}
      />

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
        <label>
          Language:
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            style={{ marginLeft: 8, padding: 8, borderRadius: 6 }}
          >
            <option value="hi">Hindi</option>
            <option value="ne">Nepali</option>
            <option value="en">English</option>
          </select>
        </label>

        <button
          onClick={handleSpeak}
          disabled={translating || speaking || !inputText.trim()}
          style={{
            marginLeft: "auto",
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            background: "#0b84ff",
            color: "white",
            cursor: "pointer",
          }}
        >
          {translating ? "Translating…" : speaking ? "Speaking…" : "🎧 Listen"}
        </button>

        <button
          onClick={handleStop}
          disabled={!speaking}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: speaking ? "#ff6b6b" : "#fff",
            color: speaking ? "#fff" : "#000",
            cursor: speaking ? "pointer" : "not-allowed",
          }}
        >
          Stop
        </button>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <strong>Translated text</strong>
          <div
            style={{
              marginTop: 8,
              padding: 12,
              minHeight: 54,
              borderRadius: 8,
              border: "1px solid #eee",
              background: "#fafafa",
              color: "#222",
              whiteSpace: "pre-wrap",
            }}
          >
            {translating ? "Translating…" : translatedText || "Translation will appear here."}
          </div>
        </div>

        <div style={{ width: 200 }}>
          <strong>Voice status</strong>
          <div style={{ marginTop: 8, padding: 12, borderRadius: 8, border: "1px solid #eee", background: "#fff" }}>
            <div><strong>Voices loaded:</strong> {availableVoices.length}</div>
            <div style={{ marginTop: 6 }}>
              <strong>{LANG_MAP[targetLang].label} voice:</strong>{" "}
              {ttsAvailable() ? <span style={{ color: "green" }}>Available</span> : <span style={{ color: "orange" }}>Not found on this device</span>}
            </div>

            <div style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
              Note: If device/browser doesn't have a Nepali voice, speech may sound absent or fallback to another voice. For highest-quality multilingual audio use a server TTS (ElevenLabs/Google) — I can give that server code if you want.
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 12, color: "crimson", background: "#fff4f4", padding: 10, borderRadius: 8 }}>
          {error}
        </div>
      )}
    </div>
  );
}
