document.getElementById('year').textContent = new Date().getFullYear();

  // Language toggle
  const btnBn = document.getElementById('btn-bn');
  const btnEn = document.getElementById('btn-en');
  function setLang(lang){
    document.documentElement.setAttribute('data-lang', lang);
    btnBn.classList.toggle('active', lang === 'bn');
    btnEn.classList.toggle('active', lang === 'en');
    try{ localStorage.setItem('imran-portfolio-lang', lang); }catch(e){}
  }
  btnBn.addEventListener('click', () => setLang('bn'));
  btnEn.addEventListener('click', () => setLang('en'));
  let savedLang = 'bn';
  try{ savedLang = localStorage.getItem('imran-portfolio-lang') || 'bn'; }catch(e){}
  setLang(savedLang);

  // Geometric star-field background (8-pointed star tessellation)
  (function(){
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 800 800");
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");

    const defs = document.createElementNS(svgNS, "defs");
    const pattern = document.createElementNS(svgNS, "pattern");
    pattern.setAttribute("id", "starPattern");
    pattern.setAttribute("width", "120");
    pattern.setAttribute("height", "120");
    pattern.setAttribute("patternUnits", "userSpaceOnUse");

    function star(cx, cy, r1, r2, points){
      let d = "";
      const step = Math.PI / points;
      for(let i=0; i<2*points; i++){
        const r = i % 2 === 0 ? r1 : r2;
        const a = i * step - Math.PI/2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        d += (i===0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1) + " ";
      }
      d += "Z";
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#c9a15a");
      path.setAttribute("stroke-width", "1");
      return path;
    }

    pattern.appendChild(star(0,0,26,11,8));
    pattern.appendChild(star(120,0,26,11,8));
    pattern.appendChild(star(0,120,26,11,8));
    pattern.appendChild(star(120,120,26,11,8));
    pattern.appendChild(star(60,60,26,11,8));

    defs.appendChild(pattern);
    svg.appendChild(defs);

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "url(#starPattern)");
    svg.appendChild(rect);

    document.getElementById('starField').appendChild(svg);
  })();
