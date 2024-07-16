export function randomCode() {
  const chuoiKiTu = "0123456789";
  let chuoi = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * chuoiKiTu.length);
    chuoi += chuoiKiTu[randomIndex];
  }
  return chuoi;
}
