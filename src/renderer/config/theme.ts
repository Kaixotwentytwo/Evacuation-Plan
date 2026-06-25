export const Theme = {
  // Основные цвета
  primary: '#4a90d9',
  primaryDark: '#357abd',
  primaryLight: '#7ab3f0',
  
  // Цвета стен
  wall: {
    outer: '#4a90d9',
    outerStroke: '#2c5f9e',
    inner: '#f5a623',
    innerStroke: '#c17d11',
  },
  
  // Цвета элементов управления
  controls: {
    cornerFill: '#ffffff',
    cornerStroke: '#4a90d9',
    cornerSize: 14,
    borderColor: '#4a90d9',
    borderDashArray: [5, 3],
    selectionColor: 'rgba(74, 144, 217, 0.15)',
    rotationPointColor: '#4a90d9',
  },
  
  // Цвета текста
  text: {
    primary: '#333333',
    secondary: '#666666',
    placeholder: '#999999',
  },
  
  // Цвета canvas
  canvas: {
    background: '#f8f9fa',
    grid: '#e0e0e0',
  },
  
  // Цвета состояний
  state: {
    hover: 'rgba(74, 144, 217, 0.1)',
    selected: 'rgba(74, 144, 217, 0.2)',
    error: '#e74c3c',
    success: '#27ae60',
    warning: '#f39c12',
  }
} as const;

// functino
export function applyWallTheme(obj: any, type: 'outer' | 'inner' = 'outer') {
  const colors = Theme.wall[type];
  obj.set({
    fill: colors,
    stroke: Theme.wall[`${type}Stroke`],
    strokeWidth: 2,
    cornerColor: Theme.controls.cornerFill,
    cornerStrokeColor: Theme.controls.cornerStroke,
    cornerSize: Theme.controls.cornerSize,
    borderColor: Theme.controls.borderColor,
    borderDashArray: Theme.controls.borderDashArray,
  });
  return obj;
}

const GOSTColors = {
    black: {
        pantone: null,
        cmyk: [0.35, 0.50, 0.40, 0.90],
        hex: "#2b2b2c",
        rgb: [43, 43, 44],
        ral: "RAL 9004"
    },
    white: {
        pantone: null,
        cmyk: [0,   0,   0,   0],
        hex: "#F4F8F4",
        rgb: [244, 248, 244],
        ral: "RAL 9003"
    },
    green: {
        pantone: "PANTONE 3415 C",
        cmyk: [1.000, 0.000, 0.340, 0.520],
        hex: "#007A50",
        rgb: [0, 122, 81],
        ral: "RAL 6024"
    },
    red: {
        pantone: "PANTONE Warm Red C",
        cmyk: [0.000, 0.740, 0.770, 0.010],
        hex: "#FD4239",
        rgb: [252, 66, 58],
        ral: "RAL 3020"
    },
    yellow: {
        pantone: "PANTONE 109 C",
        cmyk: [0.000, 0.180, 1.000, 0.000],
        hex: "#FFD200",
        rgb: [255, 209, 0],
        ral: "RAL 1023"
    },
    blue: {
        pantone: "PANTONE 301 C",
        cmyk: [1.000, 0.460, 0.000, 0.420],
        hex: "#005195",
        rgb: [0, 80, 148],
        ral: "RAL 5005"
    }
};