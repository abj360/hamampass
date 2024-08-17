import React, { useEffect, useRef, useState } from "react";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

const AutoFocusTextarea = (props: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      setIsKeyboardOpen(true);
    };

    const handleBlur = () => {
      setIsKeyboardOpen(false);
    };

    const textarea = textareaRef.current;
    textarea?.addEventListener("focus", handleFocus);
    textarea?.addEventListener("blur", handleBlur);

    return () => {
      textarea?.removeEventListener("focus", handleFocus);
      textarea?.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    if (isKeyboardOpen) {
      const handleResize = () => {
        const screenHeight = window.innerHeight;
        const rect = textareaRef.current?.getBoundingClientRect();
        const bottomSpace = screenHeight - (rect?.bottom || 0);

        if (bottomSpace < 0) {
          window.scrollTo(0, document.body.scrollHeight);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isKeyboardOpen]);

  return (
    <Textarea
      {...props}
      ref={textareaRef}
      style={{
        position: isKeyboardOpen ? "fixed" : "relative",
        bottom: isKeyboardOpen ? "10px" : "auto",
        width: "100%",
        zIndex: 1000,
      }}
    />
  );
};

export default AutoFocusTextarea;
