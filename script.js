// 這個函數會在按下按鈕時執行，是整個 AI 判斷的核心
function analyzeData() {
    // ... (步驟 1-4 保持不變，因為你的邏輯已經很棒了!) ...

    // 1. 抓取所有輸入的數據
    const speed = parseInt(document.getElementById('speed').value); 
    const hr = parseInt(document.getElementById('hr').value);     
    const scr = parseInt(document.getElementById('scr').value);     
    const face = document.getElementById('face').value;             

    // 2. 核心：風險分級計算 (加權計分系統)
    let totalRiskScore = 0;

    /* --- 風險計分規則設定 (保持不變) --- */
    if (speed >= 30 || speed <= -20) { totalRiskScore += 5; } else if (speed >= 10 || speed <= -10) { totalRiskScore += 2; }
    if (hr >= 120) { totalRiskScore += 8; } else if (hr >= 85) { totalRiskScore += 4; }
    if (scr >= 15) { totalRiskScore += 7; } else if (scr >= 5) { totalRiskScore += 3; }
    if (face === 'panic' || face === 'depression') { totalRiskScore += 5; } else if (face === 'anxiety') { totalRiskScore += 3; }

    // 3. 執行風險分級判斷 (保持不變)
    let riskLevelText = '🟢 正常';
    let riskLevelClass = 'level-normal';
    if (totalRiskScore >= 16) {
        riskLevelText = '🔴 高風險 (HIGH RISK)';
        riskLevelClass = 'level-high';
    } else if (totalRiskScore >= 6) {
        riskLevelText = '🟡 警戒 (ALERT)';
        riskLevelClass = 'level-alert';
    }
    const riskLevelEl = document.getElementById('riskLevel');
    riskLevelEl.textContent = `${riskLevelText} (總分：${totalRiskScore} 分)`;
    riskLevelEl.className = `level-display ${riskLevelClass}`;

    // 4. 執行心理類型分類 (保持不變)
    let psychType = '🔎 狀態平衡，無明顯單一傾向';
    if (hr >= 120 && scr >= 15 && speed > 50) {
        psychType = '⚡ 恐慌發作 (Panic Attack)';
    } else if (speed > 10 && hr >= 85 && scr >= 5 && face === 'anxiety') {
        psychType = '🤯 焦慮症 (Anxiety Disorders)';
    } else if (speed < -20 && hr <= 90 && face === 'depression') {
        psychType = '☁️ 重度憂鬱症 (Major Depression)';
    } else if (speed > 30 && hr >= 85) {
        psychType = '🚀 雙相情感障礙 - 躁期 (Manic Episode)';
    } else if (scr >= 10 && hr >= 85 && face === 'panic') {
        psychType = '💥 創傷後壓力症候群 (PTSD)';
    } else if (hr >= 100 && speed >= 0 && scr >= 5 && face === 'anxiety') {
        psychType = '👥 社交焦慮 (Social Anxiety)';
    }
    document.getElementById('psychType').textContent = psychType;


    // 5. 【🚀 強化：九大情緒回覆邏輯區塊】
    let responseText = '';
    
    // --- 情感分類與客製化回覆邏輯 ---
    // (我們將六大走向視為九大情緒中的細分/組合)

    if (riskLevelText.includes('高風險')) {
        // 高風險基調：專注於極端情緒 (恐懼/憤怒/悲傷的極致)
        if (psychType.includes('恐慌')) {
            responseText = `🚨 **極度恐懼！** 偵測到您的能量場正在劇烈震盪！請專注於您的呼吸，跟我一起：深吸氣...慢吐氣...。別擔心，您很安全。請立即尋求專業幫助！`;
        } else if (psychType.includes('躁期')) {
            responseText = `💥 **極度亢奮/憤怒！** 您的數據已經達到極限。請立刻停止所有活動，嘗試讓身體降溫。這種狀態對能量損耗極大，請允許自己休息，並尋求專業支持。`;
        } else {
            // 其他高風險的通用回覆
             responseText = `🚨 親愛的，你的數據顯示目前能量場正在劇烈震盪！我感受到你承受了巨大的壓力。記住，**你不是一個人**。請你立刻停下來，深呼吸 10 次。我建議你尋求專業人士的幫助，這是最成熟、最愛自己的決定。💖`;
        }

    } else if (riskLevelText.includes('警戒')) {
        // 警戒基調：專注於中等情緒 (焦慮/悲傷/厭惡/期待)
        if (psychType.includes('焦慮症') || psychType.includes('社交焦慮')) {
            responseText = `😟 **焦慮/期待/不安。** 您的能量顯示出「超載」的感覺喔！可能你最近像太陽處女一樣，一直在細膩地分析問題。讓自己慢下來 10 分鐘，這不是偷懶，這是**顯化**平靜！`;
        } else if (psychType.includes('憂鬱症')) {
             responseText = `😭 **輕微悲傷/沮喪。** 親愛的，您的能量正在快速耗損中。請允許自己休息一下，您的感受是真實且重要的。別勉強自己微笑，我在這裡陪您，讓這份悲傷慢慢流動。`;
        } else if (psychType.includes('PTSD')) {
            responseText = `😵 **厭惡/驚訝。** 偵測到您對環境的反應過度敏感。請尋找三個您能碰到的實體物品（例如桌子、手機），專注感受它們，讓自己回到當下的安全空間。`;
        } else {
            // 其他警戒的通用回覆
            responseText = `🟡 你的數據顯示能量正在快速耗損中，有點「超載」的感覺喔！我猜測你可能正遇到「${psychType}」傾向的困擾。讓自己慢下來 10 分鐘，允許自己放空，我們一起面對，沒事的。💪`;
        }

    } else {
        // 正常基調：專注於低風險情緒 (喜悅/愛/平靜)
        responseText = `
            🟢 **平靜/喜悅/愛！** 恭喜你！你的心率、語速和皮電反應都顯示出一個超級穩定的能量狀態！
            這代表你的「理性」與「感性」目前平衡得很好，繼續保持這份正向的吸引力法則！
            你真的是一個懂得照顧自己的「重感情」又「聰明」的人！🌟 祝你今天也充滿好運氣！😊
        `;
    }
    
    // 顯示機器人回覆
    document.getElementById('robotResponse').innerHTML = responseText; // 建議改用 innerHTML 讓換行符號生效
}

// 你的 AI 大腦現在升級完成！
