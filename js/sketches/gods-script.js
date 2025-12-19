let t = 0; 
let lastMouseMoveTime = 0;
let isHoveringVoid = false;
let epiphanyLevel = 0; 

let skinWords = ["TZINACAN", "QAHOLOM", "JAGUAR", "DIOS", "::", "//", "||"];
let wheelWords = []; 

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('art-overlay');
    
    if (windowWidth < 768) {
        pixelDensity(1);
    }
    
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

    let waitTime = isMobile ? 1500 : 2000;

    if (isHoveringVoid && timeStill > waitTime && inSacredZone && mouseInside) {
        epiphanyLevel = lerp(epiphanyLevel, 1, 0.05);
    } else {
        epiphanyLevel = lerp(epiphanyLevel, 0, 0.1);
    }

    if (epiphanyLevel < 0.99) drawSkin(1 - epiphanyLevel, isMobile); 
    if (epiphanyLevel > 0.01) drawWheel(epiphanyLevel, isMobile); 

    t += isMobile ? 0.006 : 0.004;
}

function drawSkin(opacityFactor, isMobile) {
    fill(20, 10, 0, 255 * opacityFactor); 

    let scale = isMobile ? 0.006 : 0.002; 
    let step = isMobile ? 35 : 25; 
    
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
                
                let maxSize = isMobile ? 32 : 28;
                let size = map(noiseVal, 0.4, 0.6, 10, maxSize); 
                textSize(size);
                text(word.charAt(0), x, y); 
            }
        }
    }
}

function drawWheel(opacityFactor, isMobile) {
    push();
    translate(width/2, height/2);
    
    let rings = isMobile ? 12 : 20; 
    let maxRadius = dist(0,0,width,height) * 0.7; 

    for (let r = 1; r < rings; r++) {
        let radius = map(r, 0, rings, 50, maxRadius);
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
function touchMoved() { lastMouseMoveTime = millis(); return false; }
function windowResized() { resizeCanvas(windowWidth, windowHeight); }
