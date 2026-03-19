export async function exportChartAsPNG(elementId: string, filename = "chart.png"): Promise<void> {
  const { default: html2canvas } = await import("html2canvas");
  const el = document.getElementById(elementId);
  if (!el) throw new Error("Chart element not found");

  const canvas = await html2canvas(el, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
