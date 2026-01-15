"use client";

export default function ImageUpload({
  onChange,
  disabled,
}: {
  onChange: (src: string) => void;
  disabled: boolean;
}) {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;  

    const url = URL.createObjectURL(file);
    onChange(url);
  };

  return (
    <div className="border-2 p-1 rounded-2xl border-blue-700 w-51">
      <div className="text-center font-bold text-cyan-600 mb-1">
        Image
      </div>

      <input
        type="file"
        accept="image/*"
        disabled={disabled}
        onChange={handleFileChange}
        className="text-sm"
      />
    </div>
  );
}
