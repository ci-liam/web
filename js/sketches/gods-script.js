let t = 0; 
let lastMouseMoveTime = 0;
let isHoveringVoid = false;
let epiphanyLevel = 0; 

let skinWords = ["TZINACAN", "QAHOLOM", "JAGUAR", "DIOS", "::", "//", "||"];
let wheelWords = []; 

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('art-overlay');
    
    textFont('Courier Prime');
    textAlign(CENTER, CENTER);
    noStroke();

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let i=0; i<100; i++) {
        let r = floor(random(alphabet.length));
        wheelWords.push(alphabet.charAt(r));
    }
    for(let i=0; i<8; i++) {
        wheelWords.push("INFINITO");
    }
    
    noLoop(); 
}

function draw() {
    // Detectar si es móvil para ajustar la experiencia
    let isMobile = windowWidth < 768;

    if (epiphanyLevel > 0.1) {
        background(160, 90, 0, 100); 
    } else {
        background(180, 100, 0, 50);  
    }

    let timeStill = millis() - lastMouseMoveTime;
    
    let mouseInside = (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);
    
    let dToCenter = dist(mouseX, mouseY, width/2, height/2);
    let sacredZoneRadius = min(width, height) * 0.25; 
    let inSacredZone = dToCenter < sacredZoneRadius;

    if (isHoveringVoid && timeStill > 2000 && inSacredZone && mouseInside) {
        epiphanyLevel = lerp(epiphanyLevel, 1, 0.05);
    } else {
        epiphanyLevel = lerp(epiphanyLevel, 0, 0.1);
    }

    // Pasamos la variable 'isMobile' a las funciones de dibujo
    if (epiphanyLevel < 0.99) drawSkin(1 - epiphanyLevel, isMobile); 
    if (epiphanyLevel > 0.01) drawWheel(epiphanyLevel, isMobile); 

    // AJUSTE DE VELOCIDAD:
    // En móvil va más rápido (0.006) para que se note el movimiento
    // En escritorio mantiene el ritmo hipnótico lento (0.004)
    t += isMobile ? 0.006 : 0.004;
}

function drawSkin(opacityFactor, isMobile) {
    fill(20, 10, 0, 255 * opacityFactor); 

    // AJUSTE DE ESCALA (EL "ZOOM"):
    // En móvil usamos 0.006 (Zoom Out) para ver más manchas en menos espacio.
    // En escritorio usamos 0.002 (Zoom In) para ver detalles grandes.
    let scale = isMobile ? 0.006 : 0.002; 
    
    let step = 25; 
    let cols = width / step;
    let rows = height / step;
    
    let mouseNoise = noise(mouseX * scale, mouseY * scale, t);
    isHoveringVoid = !(mouseNoise > 0.4 && mouseNoise < 0.6);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * step;
            let y = j * step;
            let noiseVal = noise(x * scale, y * scale, t);

            if (noiseVal > 0.4 && noiseVal < 0.6) {
                let index = floor(map(noiseVal, 0.4, 0.6, 0, skinWords.length));
                let word = skinWords[index];
                
                let size = map(noiseVal, 0.4, 0.6, 10, 28); 
                textSize(size);
                text(word.charAt(0), x, y); 
            }
        }
    }
}

function drawWheel(opacityFactor, isMobile) {
    push();
    translate(width/2, height/2);
    let rings = 20; 
    let maxRadius = dist(0,0,width,height) * 0.7; 

    for (let r = 1; r < rings; r++) {
        let radius = map(r, 0, rings, 50, maxRadius);
        // Menos palabras en móvil para no saturar
        let items = r * (isMobile ? 5 : 8); 
        let dir = (r % 2 == 0) ? 1 : -1;
        let rotation = t * dir * 0.2; 

        for (let i = 0; i < items; i++) {
            let angle = map(i, 0, items, 0, TWO_PI) + rotation;
            let x = radius * cos(angle);
            let y = radius * sin(angle);
            
            let colNoise = noise(x * 0.01, y * 0.01, t);
            let rVal = 255;
            let gVal = map(colNoise, 0, 1, 255, 200); 
            let bVal = map(colNoise, 0, 1, 255, 0);   
            
            fill(rVal, gVal, bVal, 255 * opacityFactor);
            textSize(12);
            push();
            translate(x, y);
            rotate(angle + PI/2);
            
            // Usamos un factor diferente para el ruido en móvil para variedad
            let noiseScaleForWords = isMobile ? 200 : 100;
            let noiseIndex = noise(i * noiseScaleForWords, r * noiseScaleForWords); 
            let wordIndex = floor(map(noiseIndex, 0, 1, 0, wheelWords.length));
            let word = wheelWords[wordIndex];
            
            if (word === "INFINITO") {
                textStyle(BOLD); textSize(14);
            } else {
                textStyle(NORMAL); textSize(12);
            }
            text(word, 0, 0);
            pop();
        }
    }
    pop();
}

function mouseMoved() { lastMouseMoveTime = millis(); }
// Touch moved ayuda a detectar movimiento en pantallas táctiles
function touchMoved() { lastMouseMoveTime = millis(); return false; }
function windowResized() { resizeCanvas(windowWidth, windowHeight); }
