onload = function () {
	const body = document.body;
	const currentTheme = localStorage.getItem("theme") || "light";
	body.dataset.theme = currentTheme;

	if (currentTheme === "dark") {
		document.getElementById("sun").classList.remove("hidden");
		document.getElementById("moon").classList.add("hidden");
	} else {
		document.getElementById("moon").classList.remove("hidden");
		document.getElementById("sun").classList.add("hidden");
	}

	this.fetch("../../data.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok.");
			}
			return response.json();
		})
		.then((data) => {
			const container = document.getElementById("extensions-container");
			data.forEach((item) => {
				const card = document.createElement("div");
				card.className = "card";
				card.innerHTML = `
                <div class="card__content">
                    <figure>
                        <img
                            class="card__content__icon"
                            src=${item.logo}
                            alt=${item.name}
                        />
                    </figure>
                    <div class="card__content__text">
                        <h3>${item.name}</h3>
                        <p>
                        ${item.description}
                        </p>
                    </div>
                </div>
                <div class="card__actions">
                    <button class="btn btn--remove" onclick="removeCard(this)">Remove</button>
                    <label class="switch">
                        <input type="checkbox" ${
							item.isActive === true ? "checked" : ""
						} />
                        <span class="slider round"></span>
                    </label>
                </div>
            `;
				container.appendChild(card);
			});
		})
		.catch((error) => {
			console.error(
				"There was a problem with the fetch operation:",
				error
			);
		});
};

function toggleTheme() {
	const body = document.body;
	const currentTheme = body.dataset.theme;

	var theme = currentTheme === "dark" ? "light" : "dark";
	body.dataset.theme = theme;
	localStorage.setItem("theme", theme);

	if (theme === "dark") {
		document.getElementById("sun").classList.remove("hidden");
		document.getElementById("moon").classList.add("hidden");
	} else {
		document.getElementById("moon").classList.remove("hidden");
		document.getElementById("sun").classList.add("hidden");
	}
}

function filterActives(sender) {
	const cards = document.querySelectorAll(".card");
	const toolbar__actions = document.querySelector(".toolbar__actions");
	const buttonActive = toolbar__actions.querySelector(".btn--active");

	buttonActive.classList.remove("btn--active");
	sender.classList.add("btn--active");

	cards.forEach((card) => {
		const checkbox = card.querySelector("input[type='checkbox']");
		if (checkbox.checked) {
			card.style.display = "flex";
		} else {
			card.style.display = "none";
		}
	});
}

function filterInactives(sender) {
	const cards = document.querySelectorAll(".card");
	const toolbar__actions = document.querySelector(".toolbar__actions");
	const buttonActive = toolbar__actions.querySelector(".btn--active");

	buttonActive.classList.remove("btn--active");
	sender.classList.add("btn--active");

	cards.forEach((card) => {
		const checkbox = card.querySelector("input[type='checkbox']");
		if (checkbox.checked) {
			card.style.display = "none";
		} else {
			card.style.display = "flex";
		}
	});
}

function filterAll(sender) {
	const cards = document.querySelectorAll(".card");
	const toolbar__actions = document.querySelector(".toolbar__actions");
	const buttonActive = toolbar__actions.querySelector(".btn--active");

	buttonActive.classList.remove("btn--active");
	sender.classList.add("btn--active");

	cards.forEach((card) => {
		card.style.display = "flex";
	});
}

function removeCard(sender) {
	const card = sender.closest(".card");
	card.remove();
}
