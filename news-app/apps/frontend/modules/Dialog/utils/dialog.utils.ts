export function closeDialog(id: string) {
  return document.getElementById(`${id}-close`).click();
}
