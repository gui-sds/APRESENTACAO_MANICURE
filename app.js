(() => {
  "use strict";
  const config = window.STUDIO_CONFIG;
  const $ = (selector) => document.querySelector(selector);
  const serviceSelect = $("#service"),
    dateInput = $("#date"),
    timeSelect = $("#time");
  const form = $("#booking-form"),
    dialog = $("#preview-dialog");
  const formatMoney = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  const localDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const parseDate = (value) => new Date(`${value}T12:00:00`);
  const dateLabel = (value) =>
    parseDate(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  const whatsapp = String(config.whatsapp || "").replace(/\D/g, "");
  const hasWhatsApp = /^\d{12,15}$/.test(whatsapp);
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? url.href : null;
    } catch {
      return null;
    }
  };
  const setExternal = (element, url) => {
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  };
  const create = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  config.services.forEach((service, index) => {
    serviceSelect.add(new Option(service.name, service.id));
    const row = create("button", "service-row reveal");
    row.type = "button";
    row.setAttribute("aria-label", `Agendar ${service.name}`);
    row.append(
      create("span", "service-number", String(index + 1).padStart(2, "0")),
      create("span", "service-name", service.name),
      create("span", "service-desc", service.description),
    );
    const meta = create(
      "span",
      "service-meta",
      service.price == null ? "Sob consulta" : formatMoney(service.price),
    );
    meta.append(create("span", "", `aprox. ${service.duration} min`));
    row.append(meta);
    const arrow = create("span", "service-arrow");
    arrow.innerHTML = '<svg aria-hidden="true"><use href="#i-arrow"/></svg>';
    row.append(arrow);
    row.addEventListener("click", () => {
      serviceSelect.value = service.id;
      updateSummary();
      $("#agendamento").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      serviceSelect.focus({ preventScroll: true });
    });
    $("#service-list").append(row);
  });

  const now = new Date();
  dateInput.min = localDate(now);
  const lastDay = new Date(now);
  lastDay.setDate(lastDay.getDate() + 90);
  dateInput.max = localDate(lastDay);
  function updateTimes() {
    dateInput.setCustomValidity("");
    timeSelect.replaceChildren(new Option("Selecione um horário", ""));
    timeSelect.disabled = true;
    $("#date-help").textContent =
      "Os horários são preferências, sujeitos à confirmação.";
    if (!dateInput.value) {
      updateSummary();
      return;
    }
    if (
      dateInput.value < localDate(new Date()) ||
      dateInput.value > dateInput.max
    ) {
      dateInput.setCustomValidity(
        "Escolha uma data entre hoje e os próximos 90 dias.",
      );
      $("#date-help").textContent =
        "Escolha uma data entre hoje e os próximos 90 dias.";
      updateSummary();
      return;
    }
    if (!config.workingDays.includes(parseDate(dateInput.value).getDay())) {
      dateInput.setCustomValidity(
        "Não há atendimento neste dia da semana. Escolha outro dia.",
      );
      $("#date-help").textContent =
        "Não há atendimento neste dia. Escolha outra data.";
      updateSummary();
      return;
    }
    const current = new Date();
    const slots = config.timeSlots.filter(
      (slot) =>
        dateInput.value !== localDate(current) ||
        slot >
          `${String(current.getHours()).padStart(2, "0")}:${String(current.getMinutes()).padStart(2, "0")}`,
    );
    slots.forEach((slot) => timeSelect.add(new Option(slot, slot)));
    timeSelect.disabled = slots.length === 0;
    if (!slots.length) {
      dateInput.setCustomValidity(
        "Os horários de hoje já passaram. Escolha outro dia.",
      );
      $("#date-help").textContent =
        "Os horários deste dia já passaram. Que tal escolher outra data?";
    }
    updateSummary();
  }
  function updateSummary() {
    const service = config.services.find(
        (item) => item.id === serviceSelect.value,
      ),
      summary = $("#booking-summary");
    const complete =
      service &&
      dateInput.value &&
      dateInput.validity.valid &&
      timeSelect.value &&
      !timeSelect.disabled;
    summary.hidden = !complete;
    if (complete)
      summary.textContent = `${service.name} · ${dateLabel(dateInput.value)} às ${timeSelect.value}. ${service.price == null ? "Valor a combinar." : formatMoney(service.price) + "."} Confirmação pelo WhatsApp.`;
    $("#form-status").textContent = "";
  }
  dateInput.addEventListener("change", updateTimes);
  dateInput.addEventListener("input", () => dateInput.setCustomValidity(""));
  serviceSelect.addEventListener("change", updateSummary);
  timeSelect.addEventListener("change", updateSummary);
  $("#name").addEventListener("input", () => $("#name").setCustomValidity(""));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedTime = timeSelect.value;
    updateTimes();
    if ([...timeSelect.options].some((option) => option.value === selectedTime))
      timeSelect.value = selectedTime;
    const name = $("#name").value.trim();
    $("#name").setCustomValidity(
      name.length < 2 ? "Informe seu nome com pelo menos 2 caracteres." : "",
    );
    if (!form.reportValidity()) return;
    const service = config.services.find(
      (item) => item.id === serviceSelect.value,
    );
    if (!service || !timeSelect.value || timeSelect.disabled) return;
    const notes = $("#notes").value.trim();
    const message = `Olá! Gostaria de solicitar um agendamento no GS RISE Nail Studio.\n\nNome: ${name}\nServiço: ${service.name}\nData desejada: ${dateLabel(dateInput.value)}\nHorário desejado: ${timeSelect.value}${service.price == null ? "" : `\nValor de referência: ${formatMoney(service.price)}`}${notes ? `\nObservações: ${notes}` : ""}\n\nPodem confirmar a disponibilidade e os detalhes, por favor?`;
    updateSummary();
    if (hasWhatsApp) {
      const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      const status = $("#form-status");
      status.textContent =
        "A solicitação está pronta. Envie a mensagem no WhatsApp para combinar seu horário. ";
      const retry = create("a", "text-link", "Abrir WhatsApp ↗");
      setExternal(retry, url);
      status.append(retry);
    } else {
      $("#message-preview").textContent = message;
      dialog.showModal();
    }
  });
  document
    .querySelectorAll(".dialog-close,.dialog-close-button")
    .forEach((button) =>
      button.addEventListener("click", () => dialog.close()),
    );
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        dialog.close();
    }
  });
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    if (hasWhatsApp)
      setExternal(
        link,
        `https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre o GS RISE Nail Studio.")}`,
      );
  });
  const instagram = safeUrl(config.instagram);
  document.querySelectorAll("[data-instagram]").forEach((link) => {
    if (instagram) setExternal(link, instagram);
    else
      link.addEventListener("click", () => {
        $("#contact-status").textContent =
          "O perfil do Instagram do studio será informado em breve.";
      });
  });
  $("#booking-demo").hidden = hasWhatsApp;
  if (config.address) $("#studio-address").textContent = config.address;
  $("#studio-city").textContent = config.city;
  if (config.openingHours) $("#studio-hours").textContent = config.openingHours;
  const mapsUrl =
    safeUrl(config.mapsUrl) ||
    (config.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${config.address} ${config.city}`)}`
      : null);
  if (mapsUrl) {
    setExternal($("#maps-link"), mapsUrl);
    $("#maps-link").textContent = "Abrir no Google Maps ↗";
    $("#map-note").textContent = [config.address, config.city]
      .filter(Boolean)
      .join(" · ");
  } else if (hasWhatsApp)
    setExternal(
      $("#maps-link"),
      `https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Qual é o endereço do GS RISE Nail Studio?")}`,
    );
  else $("#maps-link").href = "#agendamento";
  $("#year").textContent = new Date().getFullYear();
  const menuButton = $(".menu-toggle"),
    menu = $("#mobile-menu");
  function closeMenu() {
    menu.classList.remove("open");
    menu.inert = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
  }
  menuButton.addEventListener("click", () => {
    if (menu.classList.contains("open")) closeMenu();
    else {
      menu.inert = false;
      menu.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Fechar menu");
      document.body.classList.add("menu-open");
    }
  });
  menu
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (
      menu.classList.contains("open") &&
      !$(".site-header").contains(event.target)
    )
      closeMenu();
  });
  matchMedia("(min-width: 801px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
  document.addEventListener("focusin", (event) => {
    if (
      menu.classList.contains("open") &&
      !$(".site-header").contains(event.target)
    )
      closeMenu();
  });
  if ("IntersectionObserver" in window) {
    document.body.classList.add("js-motion");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    let heroVisible = true,
      bookingVisible = false,
      footerVisible = false;
    const mobileCta = $(".mobile-booking");
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.matches(".hero")) heroVisible = entry.isIntersecting;
          if (entry.target.matches(".booking"))
            bookingVisible = entry.isIntersecting;
          if (entry.target.matches(".site-footer"))
            footerVisible = entry.isIntersecting;
        });
        mobileCta.classList.toggle(
          "show",
          !heroVisible && !bookingVisible && !footerVisible,
        );
      },
      { threshold: 0 },
    );
    [".hero", ".booking", ".site-footer"].forEach((selector) =>
      ctaObserver.observe($(selector)),
    );
  }
})();
