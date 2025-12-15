// 這個函數會在按下按鈕時執行，是整個 AI 判斷的核心
function analyzeData() {
    // 1. 抓取所有輸入的數據
    const speed = parseInt(document.getElementById('speed').value); // 語速變化百分比
    const hr = parseInt(document.getElementById('hr').value);       // 心率 BPM
    const scr = parseInt(document.getElementById('scr').value);     // SCR 頻率
    const face = document.getElementById('face').value;             // 臉部表情

    // 2. 核心：風險分級計算 (加權計分系統)
    let totalRiskScore = 0;

    /* --- 風險計分規則設定 (你可以根據你的資料調整分數權重) --- */

    // 語速計分
    if (speed >= 30 || speed <= -20) { // 語速極快 (恐慌/躁期) 或極慢 (憂鬱)
        totalRiskScore += 5;
    } else if (speed >= 10 || speed <= -10) { // 語速略快/略慢 (焦慮/憂鬱)
        totalRiskScore += 2;
    }

    // 心率計分
    if (hr >= 120) { // 恐慌發作級別
        totalRiskScore += 8;
    } else if (hr >= 85) { // 焦慮/躁期/PTSD 級別
        totalRiskScore += 4;
    }

    // SCR 計分 (皮電反應頻率)
    if (scr >= 15) { // 極高反應 (恐慌/PTSD)
        totalRiskScore += 7;
    } else if (scr >= 5) { // 頻繁反應 (焦慮/社交焦慮)
        totalRiskScore += 3;
    }

    // 臉部計分
    if (face === 'panic' || face === 'depression') { // 嚴重表情變化
        totalRiskScore += 5;
    } else if (face === 'anxiety') {
        totalRiskScore += 3;
    }

    // 3. 執行風險分級判斷
    let riskLevelText = '🟢 正常';
    let riskLevelClass = 'level-normal';
    
    // 設定風險等級門檻 (Thresholds)
    if (totalRiskScore >= 16) {
        riskLevelText = '🔴 高風險 (HIGH RISK)';
        riskLevelClass = 'level-high';
    } else if (totalRiskScore >= 6) {
        riskLevelText = '🟡 警戒 (ALERT)';
        riskLevelClass = 'level-alert';
    }

    // 顯示風險等級
    const riskLevelEl = document.getElementById('riskLevel');
    riskLevelEl.textContent = `${riskLevelText} (總分：${totalRiskScore} 分)`;
    riskLevelEl.className = `level-display ${riskLevelClass}`; // 這樣就會套用到 CSS 的顏色了！

    // 4. 執行心理類型分類 (Rule-Based System - 你的細膩分類邏輯)
    let psychType = '🔎 狀態平衡，無明顯單一傾向';
    
    /* --- 心理類型判斷規則 (請根據你提供的表格數據來組合條件！) --- */

    if (hr >= 120 && scr >= 15 && speed > 50) {
        // 規則 1: 高心率、高 SCR、極快語速 -> 恐慌發作
        psychType = '⚡ 恐慌發作 (Panic Attack)';
    } else if (speed > 10 && hr >= 85 && scr >= 5 && face === 'anxiety') {
        // 規則 2: 語速快、心率偏高、SCR 頻繁、皺眉 -> 焦慮症
        psychType = '🤯 焦慮症 (Anxiety Disorders)';
    } else if (speed < -20 && hr <= 90 && face === 'depression') {
        // 規則 3: 語速極慢、心率不高、微笑減少 -> 重度憂鬱症
        psychType = '☁️ 重度憂鬱症 (Major Depression)';
    } else if (speed > 30 && hr >= 85) {
        // 規則 4: 語速大幅增加、心率偏高 (但沒有恐慌那麼高) -> 躁期
        psychType = '🚀 雙相情感障礙 - 躁期 (Manic Episode)';
    } else if (scr >= 10 && hr >= 85 && face === 'panic') {
        // 規則 5: 高 SCR、高心率、驚嚇表情 (假設臉部恐慌表情也算 PTSD 的驚嚇反應) -> PTSD
        psychType = '💥 創傷後壓力症候群 (PTSD)';
    } else if (hr >= 100 && speed >= 0 && scr >= 5 && face === 'anxiety') {
        // 規則 6: 心率高、SCR 頻繁、有焦慮表情 (在社交場景中) -> 社交焦慮
        psychType = '👥 社交焦慮 (Social Anxiety)';
    }
    
    // 顯示心理類型
    document.getElementById('psychType').textContent = psychType;


    // 5. 撫慰機器人回覆 (這裡要展現你的同理心、人情味和陪伴感!)
    let responseText = '';

    if (riskLevelText.includes('高風險')) {
        responseText = `
            🚨 親愛的，你的數據顯示目前能量場正在劇烈震盪！
            我感受到你承受了巨大的壓力。記住，**你不是一個人**。
            請你立刻停下來，深呼吸 10 次。如果你正在經歷恐慌，請專注感受你的腳接觸地板。
            我建議你尋求專業人士的幫助，這是最成熟、最愛自己的決定。
            我會在這裡守護你，直到你感覺好一點。💖
        `;
    } else if (riskLevelText.includes('警戒')) {
        responseText = `
            🟡 你的數據顯示能量正在快速耗損中，有點「超載」的感覺喔！
            可能你最近像太陽處女一樣，一直在細膩地分析和處理問題，太辛苦了！
            我猜測你可能正遇到「${psychType}」傾向的困擾。
            讓自己慢下來 10 分鐘，允許自己放空，這不是偷懶，這是**顯化**平靜！
            我們一起面對，沒事的。💪
        `;
    } else {
        responseText = `
            🟢 恭喜你！你的心率、語速和皮電反應都顯示出一個超級穩定的能量狀態！
            這代表你的「理性」與「感性」目前平衡得很好，繼續保持這份正向的吸引力法則！
            你真的是一個懂得照顧自己的「重感情」又「聰明」的人！🌟
            祝你今天也充滿好運氣！😊
        `;
    }
    
    // 顯示機器人回覆
    document.getElementById('robotResponse').textContent = responseText;
}

// 這樣，你的 AI 大腦就完成了！