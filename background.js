/* background.js — Scroll-driven 3D analytics scene */
(function(){
if(typeof THREE==="undefined")return;
const canvas=document.getElementById("bg-canvas");if(!canvas)return;
const R=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
R.setSize(innerWidth,innerHeight);R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,6000);
cam.position.set(0,0,600);
const B=0x00d4ff,V=0x7b2fff,G=0xffd700,MN=0x00ffaa;
S.add(new THREE.AmbientLight(0x111133,3));
const d1=new THREE.DirectionalLight(B,1.2);d1.position.set(200,300,300);S.add(d1);
S.add(new THREE.PointLight(V,1.8,1500,1.5));

function M(c,op,w){return new THREE.MeshPhongMaterial({color:c,transparent:true,opacity:op,wireframe:!!w})}
function ME(c,op,ei){return new THREE.MeshPhongMaterial({color:c,emissive:c,emissiveIntensity:ei||.4,transparent:true,opacity:op})}
function LM(c,op){return new THREE.LineBasicMaterial({color:c,transparent:true,opacity:op})}

/* ═══════════ SCENE 0 (y=0): HERO — Dashboard HUD ═══════════ */
const g0=new THREE.Group();
// Large dashboard screen frame
function mkScreen(w,h,x,y,z,ry){
  const f=new THREE.Group();
  // Outer frame
  const frame=new THREE.Mesh(new THREE.BoxGeometry(w+8,h+8,2),M(0x111133,.85));
  f.add(frame);
  // Inner screen glow
  const screen=new THREE.Mesh(new THREE.PlaneGeometry(w,h),ME(B,.12,.3));
  screen.position.z=1.5;f.add(screen);
  // Horizontal grid lines on screen
  for(let i=0;i<5;i++){
    const ly=-h/2+10+(h-20)*i/4;
    const pts=[new THREE.Vector3(-w/2+5,ly,2),new THREE.Vector3(w/2-5,ly,2)];
    f.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),LM(B,.15)));
  }
  // Mini bar chart on screen
  for(let i=0;i<6;i++){
    const bh=(Math.random()*.6+.3)*(h*.35);
    const bw=w/10;
    const bar=new THREE.Mesh(new THREE.BoxGeometry(bw,bh,3),ME(B,.55,.3));
    bar.position.set(-w/3+(i*(w*.12)),(-h/3)+bh/2,2);f.add(bar);
  }
  f.position.set(x,y,z);f.rotation.y=ry||0;
  return f;
}
g0.add(mkScreen(200,130,0,20,-30,0));
g0.add(mkScreen(120,80,-130,40,-60,.35));
g0.add(mkScreen(120,80,130,0,-60,-.35));

// Floating KPI circles
[{x:-60,y:80,c:G,v:.72},{x:0,y:88,c:B,v:.88},{x:60,y:80,c:MN,v:.65}].forEach(k=>{
  const ring=new THREE.Mesh(new THREE.TorusGeometry(18,2.5,8,64,Math.PI*2*k.v),ME(k.c,.8,.5));
  ring.position.set(k.x,k.y,-20);ring.rotation.z=Math.PI/2;g0.add(ring);
  const bg=new THREE.Mesh(new THREE.TorusGeometry(18,1,8,64),M(0x222244,.3));
  bg.position.set(k.x,k.y,-21);g0.add(bg);
});

// Floating data particles
const pc=160,pp=new Float32Array(pc*3),pv=[];
for(let i=0;i<pc;i++){
  pp[i*3]=(Math.random()-.5)*480;pp[i*3+1]=(Math.random()-.5)*280;pp[i*3+2]=(Math.random()-.5)*150-80;
  pv.push({x:(Math.random()-.5)*.3,y:(Math.random()-.5)*.25});
}
const pG=new THREE.BufferGeometry();pG.setAttribute("position",new THREE.BufferAttribute(pp,3));
g0.add(new THREE.Points(pG,new THREE.PointsMaterial({color:B,size:2,transparent:true,opacity:.5})));
const lm=LM(B,.06);let lG=new THREE.BufferGeometry(),lS=new THREE.LineSegments(lG,lm);g0.add(lS);

// Spinning torus knots
for(let i=0;i<3;i++){
  const tk=new THREE.Mesh(new THREE.TorusKnotGeometry(18+i*8,4,64,8,2,3),M([B,V,G][i],.3,true));
  tk.position.set(-170+i*170,(Math.random()-.5)*80,-100-i*30);
  tk.userData={rx:.005+i*.002,ry:.007-i*.001};
  g0.add(tk);
}
// Wireframe icosahedrons
for(let i=0;i<4;i++){
  const ico=new THREE.Mesh(new THREE.IcosahedronGeometry(20+Math.random()*15,0),M(i%2?B:V,.2,true));
  ico.position.set((Math.random()-.5)*400,(Math.random()-.5)*200,-60);
  ico.userData={rx:(Math.random()-.5)*.006,ry:(Math.random()-.5)*.008};
  g0.add(ico);
}
g0.position.y=0;S.add(g0);

/* ═══════════ SCENE 1 (y=-600): ABOUT — Pie+Donut+Gauges ═══════════ */
const g1=new THREE.Group();
// Large 3D donut chart
const donutG=new THREE.Group();
const slices=[{a:.30,c:B},{a:.25,c:V},{a:.20,c:G},{a:.15,c:MN},{a:.10,c:0xff6b6b}];
let startA=0;
slices.forEach(sl=>{
  const seg=new THREE.Mesh(new THREE.TorusGeometry(70,22,12,40,Math.PI*2*sl.a),M(sl.c,.8));
  seg.rotation.z=startA;donutG.add(seg);startA+=Math.PI*2*sl.a;
});
donutG.position.set(-80,0,0);donutG.rotation.x=.4;g1.add(donutG);

// Gauge meters
[{x:100,y:45,v:.75,c:B},{x:100,y:-35,v:.60,c:G},{x:165,y:5,v:.90,c:MN}].forEach(ga=>{
  // Gauge background arc
  const bg=new THREE.Mesh(new THREE.TorusGeometry(28,4,8,40,Math.PI),M(0x222244,.35));
  bg.position.set(ga.x,ga.y,0);bg.rotation.z=-Math.PI/2;g1.add(bg);
  // Gauge fill arc
  const fill=new THREE.Mesh(new THREE.TorusGeometry(28,4,8,40,Math.PI*ga.v),ME(ga.c,.75,.4));
  fill.position.set(ga.x,ga.y,1);fill.rotation.z=-Math.PI/2;g1.add(fill);
  // Needle
  const needle=new THREE.Mesh(new THREE.BoxGeometry(2,24,1),ME(ga.c,.9,.5));
  needle.position.set(ga.x,ga.y+10,2);
  needle.rotation.z=-Math.PI/2+Math.PI*ga.v;g1.add(needle);
});

// Floating percentage numbers (represented as small clusters)
for(let i=0;i<8;i++){
  const dot=new THREE.Mesh(new THREE.SphereGeometry(3,8,8),ME(i%2?B:V,.5,.3));
  dot.position.set((Math.random()-.5)*200,(Math.random()-.5)*130,(Math.random()-.5)*60);
  dot.userData={oy:dot.position.y,ph:Math.random()*6.28};g1.add(dot);
}
// Funnel chart (left-bottom)
const funnelG=new THREE.Group();
[{r:50,y:50,c:B},{r:38,y:25,c:V},{r:26,y:0,c:G},{r:16,y:-25,c:MN}].forEach(f=>{
  const ring=new THREE.Mesh(new THREE.TorusGeometry(f.r,6,8,32),M(f.c,.55));
  ring.rotation.x=Math.PI/2;ring.position.y=f.y;funnelG.add(ring);
  // Connect vertical lines
  for(let a=0;a<4;a++){
    const ang=a*Math.PI/2;
    const pt1=new THREE.Vector3(Math.cos(ang)*f.r,f.y,Math.sin(ang)*f.r);
    const pt2=new THREE.Vector3(Math.cos(ang)*(f.r-12),f.y-25,Math.sin(ang)*(f.r-12));
    funnelG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([pt1,pt2]),LM(f.c,.15)));
  }
});
funnelG.position.set(-170,-40,-40);funnelG.rotation.y=.3;g1.add(funnelG);

// Heatmap grid (top-right)
for(let r=0;r<5;r++) for(let c=0;c<7;c++){
  const intensity=Math.random();
  const col=new THREE.Color().setHSL(.55+intensity*.12,1,.3+intensity*.35);
  const cell=new THREE.Mesh(new THREE.BoxGeometry(12,12,3+intensity*6),new THREE.MeshPhongMaterial({color:col,transparent:true,opacity:.6}));
  cell.position.set(120+c*15,50-r*15,0);g1.add(cell);
}
g1.position.set(0,-600,0);S.add(g1);

/* ═══════════ SCENE 2 (y=-1200): SKILLS — Line Graph + Scatter ═══════════ */
const g2=new THREE.Group();
// Large line graph
const graphG=new THREE.Group();
// Axes
graphG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-150,-80,0),new THREE.Vector3(150,-80,0)]),LM(0xffffff,.12)));
graphG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-150,-80,0),new THREE.Vector3(-150,80,0)]),LM(0xffffff,.12)));
// Grid
for(let i=1;i<5;i++){
  const y=-80+i*40;
  graphG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-150,y,0),new THREE.Vector3(150,y,0)]),LM(0xffffff,.04)));
}
// Line 1 — trending up
const pts1=[];for(let i=0;i<10;i++){pts1.push(new THREE.Vector3(-140+i*32,-60+Math.sin(i*.8)*20+i*12,(Math.random()-.5)*10));}
const lineGeo1=new THREE.BufferGeometry().setFromPoints(pts1);
graphG.add(new THREE.Line(lineGeo1,new THREE.LineBasicMaterial({color:B,linewidth:2,transparent:true,opacity:.8})));
pts1.forEach(p=>{const d=new THREE.Mesh(new THREE.SphereGeometry(3,8,8),ME(B,.9,.5));d.position.copy(p);graphG.add(d);});
// Line 2 — secondary metric
const pts2=[];for(let i=0;i<10;i++){pts2.push(new THREE.Vector3(-140+i*32,-40+Math.cos(i*.6)*25+i*6,(Math.random()-.5)*10));}
graphG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2),new THREE.LineBasicMaterial({color:V,transparent:true,opacity:.6})));
pts2.forEach(p=>{const d=new THREE.Mesh(new THREE.SphereGeometry(2.5,8,8),ME(V,.8,.4));d.position.copy(p);graphG.add(d);});
graphG.position.set(-20,20,0);g2.add(graphG);

// 3D scatter plot cluster (right side)
for(let i=0;i<45;i++){
  const r=Math.random();
  const dot=new THREE.Mesh(new THREE.SphereGeometry(2+Math.random()*3,8,8),ME(r>.6?B:r>.3?G:V,.65,.3));
  dot.position.set(140+(Math.random()-.5)*80,(Math.random()-.5)*100,(Math.random()-.5)*60);
  dot.userData={oy:dot.position.y,ph:Math.random()*6.28};g2.add(dot);
}
// Neural network (bottom-left)
const nnG=new THREE.Group();
const nnLayers=[3,5,4,3];const nnNodes=[];
nnLayers.forEach((n,li)=>{
  for(let ni=0;ni<n;ni++){
    const pos=new THREE.Vector3((li-1.5)*45,(ni-n/2+.5)*30,0);
    nnNodes.push({pos,li});
    const nd=new THREE.Mesh(new THREE.SphereGeometry(5,10,10),ME(li%2?V:MN,.7,.4));
    nd.position.copy(pos);nnG.add(nd);
  }
});
nnNodes.forEach(a=>nnNodes.forEach(b=>{if(b.li===a.li+1)nnG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([a.pos,b.pos]),LM(V,.08)));}));
nnG.position.set(-160,-60,20);nnG.rotation.y=-.2;g2.add(nnG);

// Spinning wireframe dodecahedrons
for(let i=0;i<3;i++){
  const dod=new THREE.Mesh(new THREE.DodecahedronGeometry(15+i*5,0),M([B,G,V][i],.25,true));
  dod.position.set(210+i*25,(Math.random()-.5)*75,-40);
  dod.userData={rx:.004+i*.002,ry:.006};g2.add(dod);
}
g2.position.set(0,-1200,0);S.add(g2);

/* ═══════════ SCENE 3 (y=-1800): PROJECTS — Bar Chart + Database ═══════════ */
const g3=new THREE.Group();
// Large 3D bar chart
const colors3=[B,V,G,MN,0xff6b6b,B,V,G,MN,0xff6b6b];
for(let i=0;i<10;i++){
  const ht=30+Math.random()*100;
  const bar=new THREE.Mesh(new THREE.BoxGeometry(14,ht,14),M(colors3[i],.7));
  bar.position.set((i-4.5)*20,ht/2-60,0);g3.add(bar);
  // Glowing cap
  const cap=new THREE.Mesh(new THREE.BoxGeometry(16,3,16),ME(colors3[i],.85,.6));
  cap.position.set((i-4.5)*20,ht-59,0);g3.add(cap);
  bar.userData={baseH:ht,idx:i};
}

// Database cylinders (right side)
[{y:30,c:B},{y:-10,c:V},{y:-50,c:G}].forEach(db=>{
  const cyl=new THREE.Mesh(new THREE.CylinderGeometry(18,18,16,20,1,false),M(db.c,.5));
  cyl.position.set(160,db.y,20);g3.add(cyl);
  // Top disk glow
  const top=new THREE.Mesh(new THREE.CylinderGeometry(18,18,2,20),ME(db.c,.4,.4));
  top.position.set(160,db.y+9,20);g3.add(top);
  // Connection line down
  if(db.y>-50){
    g3.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(160,db.y-8,20),new THREE.Vector3(160,db.y-28,20)]),LM(db.c,.3)));
  }
});

// Data flow particles between bar chart and databases
for(let i=0;i<15;i++){
  const p=new THREE.Mesh(new THREE.SphereGeometry(2,6,6),ME(B,.6,.5));
  const t=Math.random();
  p.position.set(60+t*130,-20+Math.sin(t*3)*30,(Math.random()-.5)*30);
  p.userData={flow:true,t:Math.random(),sp:.003+Math.random()*.004};g3.add(p);
}
// Gear / cog wheels (analytics engine)
for(let i=0;i<2;i++){
  const cog=new THREE.Group();
  const base=new THREE.Mesh(new THREE.TorusGeometry(25+i*10,6,6,20),M(i?V:MN,.45));
  cog.add(base);
  // Teeth
  for(let t=0;t<8;t++){
    const tooth=new THREE.Mesh(new THREE.BoxGeometry(6,10,6),M(i?V:MN,.45));
    const ang=t*Math.PI/4;
    tooth.position.set(Math.cos(ang)*(30+i*10),Math.sin(ang)*(30+i*10),0);
    tooth.rotation.z=ang;cog.add(tooth);
  }
  cog.position.set(-140+i*55,35+i*15,-30);
  cog.userData={rx:0,ry:0,rz:(i?-.006:.006)};g3.add(cog);
}

// Treemap blocks (bottom)
for(let i=0;i<8;i++){
  const w=15+Math.random()*20,h=15+Math.random()*20;
  const block=new THREE.Mesh(new THREE.BoxGeometry(w,h,8),M([B,V,G,MN,0xff6b6b][i%5],.5));
  block.position.set(-110+(i%4)*(w+5),-90-Math.floor(i/4)*(h+5),30);
  g3.add(block);
}
g3.position.set(0,-1800,0);S.add(g3);

/* ═══════════ SCENE 4 (y=-2400): CONTACT — Globe + Connections ═══════════ */
const g4=new THREE.Group();
// Globe
const globe=new THREE.Mesh(new THREE.SphereGeometry(100,30,30),M(B,.12,true));
g4.add(globe);
const inner=new THREE.Mesh(new THREE.SphereGeometry(98,30,30),M(V,.03));
g4.add(inner);

// Data points on surface
const surfPts=[];
for(let i=0;i<60;i++){
  const phi=Math.acos(2*Math.random()-1),theta=Math.random()*6.28;
  const x=102*Math.sin(phi)*Math.cos(theta),y=102*Math.cos(phi),z=102*Math.sin(phi)*Math.sin(theta);
  const dp=new THREE.Mesh(new THREE.SphereGeometry(2.5,6,6),ME(Math.random()>.5?B:G,.8,.6));
  dp.position.set(x,y,z);g4.add(dp);surfPts.push(dp.position);
}
// Connection arcs between some surface points
for(let i=0;i<12;i++){
  const a=surfPts[Math.floor(Math.random()*surfPts.length)];
  const b=surfPts[Math.floor(Math.random()*surfPts.length)];
  const mid=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5).normalize().multiplyScalar(140);
  const curve=new THREE.QuadraticBezierCurve3(a,mid,b);
  g4.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(20)),LM(G,.18)));
}

// Orbital rings
[{r:115,c:G,rx:.3},{r:105,c:V,rx:1.2},{r:128,c:B,rx:.7}].forEach(o=>{
  const ring=new THREE.Mesh(new THREE.TorusGeometry(o.r,1.2,6,100),M(o.c,.45));
  ring.rotation.x=o.rx;g4.add(ring);
});

// Orbiting satellites
for(let i=0;i<4;i++){
  const sat=new THREE.Mesh(new THREE.OctahedronGeometry(5),ME([B,V,G,MN][i],.8,.5));
  sat.userData={orbitR:108+i*10,orbitSpeed:.008+i*.003,orbitPhase:i*1.57,orbitTilt:.3+i*.4};
  g4.add(sat);
}
// Floating code/data symbols (brackets, hashes)
for(let i=0;i<6;i++){
  const sym=new THREE.Mesh(new THREE.OctahedronGeometry(6+Math.random()*4),ME([B,V,G,MN][i%4],.5,.4));
  sym.position.set((Math.random()-.5)*240,(Math.random()-.5)*140,(Math.random()-.5)*80);
  sym.userData={orbitR:0,rx:(Math.random()-.5)*.01,ry:(Math.random()-.5)*.01};
  g4.add(sym);
}
// More orbiting satellites
for(let i=4;i<8;i++){
  const sat=new THREE.Mesh(new THREE.TetrahedronGeometry(4),ME([B,V,G,MN][i%4],.7,.5));
  sat.userData={orbitR:130+i*7,orbitSpeed:.006+i*.002,orbitPhase:i*1.2,orbitTilt:.2+i*.35};
  g4.add(sat);
}
g4.position.set(0,-2100,0);S.add(g4);

/* ── Ambient particles (full height) ── */
const aC=140,aP=new Float32Array(aC*3);
for(let i=0;i<aC;i++){aP[i*3]=(Math.random()-.5)*800;aP[i*3+1]=Math.random()*-2800;aP[i*3+2]=(Math.random()-.5)*200-60;}
const aG=new THREE.BufferGeometry();aG.setAttribute("position",new THREE.BufferAttribute(aP,3));
S.add(new THREE.Points(aG,new THREE.PointsMaterial({color:V,size:1.3,transparent:true,opacity:.3})));

/* ── Scroll + Mouse ── */
let tgtY=0,curY=0,moX=0,moY=0;
window.addEventListener("scroll",()=>{
  const f=scrollY/Math.max(1,document.body.scrollHeight-innerHeight);
  tgtY=-f*2400;
});
window.addEventListener("mousemove",e=>{
  moX=(e.clientX/innerWidth-.5)*2;moY=(e.clientY/innerHeight-.5)*2;
});

/* ── Animate ── */
let t=0;
(function tick(){
  requestAnimationFrame(tick);t+=.005;

  curY+=(tgtY-curY)*.04;
  cam.position.y=curY;
  cam.position.x+=(moX*50-cam.position.x)*.015;
  cam.position.z=600+moY*-30;
  cam.lookAt(new THREE.Vector3(cam.position.x*.15,curY-40,0));

  // Rotate groups gently
  g0.rotation.y=Math.sin(t*.4)*.15;
  g1.rotation.y=Math.sin(t*.35+1)*.12;
  g2.rotation.y=Math.sin(t*.3+2)*.10;
  g3.rotation.y=Math.sin(t*.32+3)*.13;
  g4.rotation.y=t*.08;

  // Spin sub-objects in g0
  g0.children.forEach(c=>{if(c.userData.rx){c.rotation.x+=c.userData.rx;c.rotation.y+=c.userData.ry;}});
  g2.children.forEach(c=>{if(c.userData.rx){c.rotation.x+=c.userData.rx;c.rotation.y+=c.userData.ry;}});
  g3.children.forEach(c=>{if(c.userData.rz){c.rotation.z+=c.userData.rz;}});

  // Bob dots in g1 and g2
  g1.children.forEach(c=>{if(c.userData.ph!==undefined)c.position.y=c.userData.oy+Math.sin(t*2+c.userData.ph)*5;});
  g2.children.forEach(c=>{if(c.userData.ph!==undefined)c.position.y=c.userData.oy+Math.sin(t*1.8+c.userData.ph)*6;});

  // Animate data flow particles in g3
  g3.children.forEach(c=>{
    if(c.userData.flow){
      c.userData.t+=c.userData.sp;if(c.userData.t>1)c.userData.t=0;
      const tt=c.userData.t;
      c.position.x=60+tt*140;c.position.y=-20+Math.sin(tt*3.14)*30;
    }
  });

  // Orbiting satellites in g4
  g4.children.forEach(c=>{
    if(c.userData.orbitR){
      const a=t*c.userData.orbitSpeed*60+c.userData.orbitPhase;
      const tilt=c.userData.orbitTilt;
      c.position.x=Math.cos(a)*c.userData.orbitR;
      c.position.y=Math.sin(a)*c.userData.orbitR*Math.cos(tilt);
      c.position.z=Math.sin(a)*c.userData.orbitR*Math.sin(tilt);
      c.rotation.x+=.02;c.rotation.y+=.03;
    }
  });

  // Particle network lines (hero)
  const pos=pG.attributes.position.array,lp=[];
  for(let i=0;i<pc;i++){
    pos[i*3]+=pv[i].x;pos[i*3+1]+=pv[i].y;
    if(Math.abs(pos[i*3])>350)pv[i].x*=-1;
    if(Math.abs(pos[i*3+1])>200)pv[i].y*=-1;
    for(let j=i+1;j<pc;j++){
      const dx=pos[i*3]-pos[j*3],dy=pos[i*3+1]-pos[j*3+1];
      if(dx*dx+dy*dy<4500)lp.push(pos[i*3],pos[i*3+1],pos[i*3+2],pos[j*3],pos[j*3+1],pos[j*3+2]);
    }
  }
  pG.attributes.position.needsUpdate=true;
  g0.remove(lS);lG.dispose();
  lG=new THREE.BufferGeometry();
  if(lp.length)lG.setAttribute("position",new THREE.Float32BufferAttribute(lp,3));
  lS=new THREE.LineSegments(lG,lm);g0.add(lS);

  R.render(S,cam);
})();

window.addEventListener("resize",()=>{
  cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();
  R.setSize(innerWidth,innerHeight);
});
})();
