import ButtonTextInput from "../Controllers/ButtonText";
import Color from "../Controllers/Colors";
import ImageUpload from "../Controllers/Imageupload";
import Margin from "../Controllers/Margin";
import Padding from "../Controllers/Padding";
import Size from "../Controllers/size";
import TextDecoration from "../Controllers/textDecoration";

export default function Sidebar2({
  activeStyle,
  activeFullElement,
  activeElement,
  setSections,
  setActiveElement,

  onStyleChange,
  onTextColor,
  onBold,
  onItalic,
  onUnderline,
}: {
  activeStyle: any;
  onStyleChange: (key: string, value: any) => void;
  onTextColor: (color: string) => void;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onFontSize: (size: number) => void;
}) {
  return (
    <div className="w-60 h-screen overflow-y-auto p-4 border-r-2 border-blue-700 flex flex-col gap-4">
      <span className="text-center font-bold"> Controllers </span>

      <Color
        value={activeStyle?.color ?? "#000000"}
        onChange={(val) => onTextColor(val)}
      />

      <TextDecoration
        onBold={onBold}
        onItalic={onItalic}
        onUnderline={onUnderline}
      />
      <ImageUpload
        disabled={!activeStyle}
        onChange={(src) => onStyleChange("src", src)}
      />
      {activeFullElement?.type === "button" && (
        <ButtonTextInput
          value={activeFullElement.text || ""}
          disabled={false}
          onChange={(text) => {
            setSections((prev: any[]) =>
              prev.map((section: any) => {
                if (section.id !== activeElement.sectionId) return section;

                return {
                  ...section,
                  elements: section.elements.map((el: any) =>
                    el.id === activeElement.elementId ? { ...el, text } : el
                  ),
                };
              })
            );
          }}
        />
      )}

      <Size
        value={activeStyle?.fontSize ?? 16}
        onChange={(val) => onStyleChange("fontSize", val)}
      />

      <Margin
        value={activeStyle?.margin ?? 0}
        onChange={(val) => onStyleChange("margin", val)}
      />

      <Padding
        value={activeStyle?.padding ?? 0}
        onChange={(val) => onStyleChange("padding", val)}
      />
    </div>
  );
}
