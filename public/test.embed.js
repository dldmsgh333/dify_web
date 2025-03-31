(function() {
  function getScriptParams() {
    const currentScript = document.getElementById("serengeti_function");
    const urlParams = new URLSearchParams(currentScript.src.split("?")[1]); // `?` 뒤의 쿼리 파싱

    return urlParams.get("url");
  }

  const embedURL = getScriptParams();

  //  1. 모달 & 플로팅 버튼 생성
  function createFloatingButton() {
      const button = document.createElement("button");
      button.id = "floatingButton";
      button.innerText = "+";
      button.style.position = "fixed";
      button.style.bottom = "100px";
      button.style.right = "20px";
      button.style.backgroundColor = "#03a9f4";
      button.style.color = "white";
      button.style.border = "none";
      button.style.padding = "15px";
      button.style.borderRadius = "50%";
      button.style.cursor = "pointer";
      button.style.fontSize = "16px";
      button.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)";
      document.body.appendChild(button);

      return button;
  }

  function createModal() {
      const modal = document.createElement("div");
      modal.id = "myModal";
      modal.style.display = "none";
      modal.style.position = "fixed";
      modal.style.bottom = "60px";
      modal.style.right = "20px";
      modal.style.width = "800px";
      modal.style.height = "800px";
      modal.style.backgroundColor = "white";
      modal.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.3)";
      modal.style.borderRadius = "10px";
      modal.style.overflow = "hidden";

      // 닫기 버튼 추가
      const closeButton = document.createElement("button");
      closeButton.className = "close-btn";
      closeButton.innerText = "X";
      closeButton.onclick = function() {
          modal.style.display = "none";
      };
      closeButton.style.position = "absolute";
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.style.backgroundColor = "red";
      closeButton.style.color = "white";
      closeButton.style.padding = "5px 10px";
      closeButton.style.cursor = "pointer";

      const _iframe_ = document.createElement("iframe");
      _iframe_.src = embedURL;
      _iframe_.style.width = "100%";
      _iframe_.style.height = "100%";
      _iframe_.style.border = "none";
      _iframe_.setAttribute("loading", "lazy"); // 성능 최적화
      _iframe_.setAttribute("referrerpolicy", "no-referrer"); // url 유출 방지
      _iframe_.setAttribute("sandbox", "allow-scripts allow-same-origin");// allow-same-origin이 위험한 경우는 부모랑 도메인이 같으면 위험하다.
      modal.appendChild(closeButton);
      modal.appendChild(_iframe_);
      document.body.appendChild(modal);


      return modal;
  }

  //  2. 요소 생성 & 이벤트 추가
  const floatingButton = createFloatingButton();
  const modal = createModal();

  floatingButton.addEventListener("click", function() {
      modal.style.display = modal.style.display === "block" ? "none" : "block";
  });

})();
