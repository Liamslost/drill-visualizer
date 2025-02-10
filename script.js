"use strict";

function updateDrillBit() {
  const SIG   = parseFloat(document.getElementById("sig").value);
  const DC    = parseFloat(document.getElementById("dc").value);
  const PL    = parseFloat(document.getElementById("pl").value);
  const LCF   = parseFloat(document.getElementById("lcf").value);
  const shaft = parseFloat(document.getElementById("shaft").value);
  const DCON  = parseFloat(document.getElementById("dcon").value);
  
  const scale = 5;
  const marginTop = 20;
  const svgWidth = 500;
  const cx = svgWidth / 2;
  
  const OAL = shaft + LCF + PL;
  const y_top = marginTop;                     
  const y_tip = y_top + OAL * scale;             // tip moves with PL and LCF
  const y_coneBase = y_tip - PL * scale;         // base of conical tip
  const y_shaftStart = y_tip - (PL + LCF) * scale; // end of flute region
  
  const halfAngle = SIG * Math.PI / 360;
  const r_cone = PL * Math.tan(halfAngle) * scale;
  const r_cut  = (DC / 2) * scale;
  const r_conn = (DCON / 2) * scale;
  
  let pathRight = `M ${cx} ${y_tip} `;
  pathRight += `L ${cx + r_cone} ${y_coneBase} `;
  if (r_cut > r_cone + 0.1) { pathRight += `L ${cx + r_cut} ${y_coneBase} `; }
  pathRight += `L ${cx + r_cut} ${y_shaftStart} `;
  if (Math.abs(r_cut - r_conn) > 0.1) { pathRight += `L ${cx + r_conn} ${y_shaftStart} `; }
  pathRight += `L ${cx + r_conn} ${y_top} `;
  
  let pathLeft = `L ${cx - r_conn} ${y_top} `;
  pathLeft += `L ${cx - r_conn} ${y_shaftStart} `;
  if (Math.abs(r_cut - r_conn) > 0.1) { pathLeft += `L ${cx - r_cut} ${y_shaftStart} `; }
  pathLeft += `L ${cx - r_cut} ${y_coneBase} `;
  if (r_cut > r_cone + 0.1) { pathLeft += `L ${cx - r_cone} ${y_coneBase} `; }
  pathLeft += `L ${cx} ${y_tip} `;
  
  const fullPath = pathRight + pathLeft + "Z";
  document.getElementById("drillPath").setAttribute("d", fullPath);

}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", updateDrillBit);
});
updateDrillBit();
