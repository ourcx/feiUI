function toggleTheme() {
  const html = document.documentElement;
  if (html.getAttribute("data-theme") === "dark") {
    html.removeAttribute("data-theme");
  } else {
    html.setAttribute("data-theme", "dark");
  }
}

// 根据当前主题动态返回颜色
export function getColors() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  return isDark ? darkColors : colors;
}

const colors = {
  primary: "#b51e1e",
  success: "#96c24e",
  warning: "#fed71a",
  danger: "#efafad",
  info: "#bbb5ac",
};

const darkColors = {
  primary: "#7a1313",
  success: "#6a8c32",
  warning: "#c4a415",
  danger: "#a97876",
  info: "#7e7a73",
};
