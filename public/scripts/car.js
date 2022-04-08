const url = "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json";

const content = document.getElementById("cars-container");
const inputTime = document.getElementById("inputTime");
const inputDate = document.getElementById("inputDate");
const jumlahPenumpang = document.getElementById("jumlahPenumpang");
const submitBtn = document.getElementById("submitBtn");

// data CARS daroo local storage
let data = localStorage.getItem("MOBIL");
data = JSON.parse(data);

function showData(params) {
  for (const x of params) {
    const div = document.createElement("div");
    div.classList.add("carContainer");
    div.classList.add("align-items-stretch");
    div.innerHTML = `
        <div class="card p-3">
        <img src="${x.image}" alt="" class="w-100" style="max-height: 160px">
        <div>
          <p class="fw-bold mt-1">${x.manufacture}/${x.model}</p>
        </div>
        <div>
          <h5 class="fw-bolder">Rp. ${x.rentPerDay} / hari</h5>
        </div>
        <div>
          <p>${
            x.description != ""
              ? x.description
              : "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet mollitia exercitationem vel iure! Eligendi, delectus."
          }</p>
        </div>
        <div>
          <span><i class="bi bi-people me-3"></i>${x.capacity} Orang</span>
        </div>
        <div>
          <span><i class="bi bi-gear me-3"></i>${x.transmission}</span>
        </div>
        <div>
          <span><i class="bi bi-calendar me-3"></i>Tahun ${x.year}</span>
        </div>
        <button class="btn btn-success"> Pilih Mobil</button>
      </div>`;
    content.append(div);
  }
}

function deleteData() {
  content.innerHTML = "";
}

function clickSubmit() {
  let newArr = [];
  if (
    inputDate.value !== "" &&
    inputTime.value !== "" &&
    jumlahPenumpang.value !== ""
  ) {
    let inputDateTime = Date.parse(
      inputDate.value + "T" + inputTime.value + "Z"
    );
    newArr = data.filter((x) => Date.parse(x.availableAt) >= inputDateTime);
    newArr = newArr.filter((x) => x.capacity >= jumlahPenumpang.value);
    deleteData();
    showData(newArr);
  }
  if (
    inputDate.value !== "" &&
    inputTime.value !== "" &&
    jumlahPenumpang.value === ""
  ) {
    let inputDateTime = Date.parse(
      inputDate.value + "T" + inputTime.value + "Z"
    );
    newArr = [];
    newArr = data.filter((x) => Date.parse(x.availableAt) >= inputDateTime);
    deleteData();
    showData(newArr);
  }
  if (
    inputDate.value === "" &&
    inputTime.value === "" &&
    jumlahPenumpang.value !== ""
  ) {
    newArr = [];
    newArr = data.filter((x) => x.capacity >= jumlahPenumpang.value);
    deleteData();
    showData(newArr);
  }
  if (inputDate.value !== "" && inputTime.value === "") {
    alert("Masukkan jam terlebih dahulu");
  }
  if (inputDate.value === "" && inputTime.value !== "") {
    alert("Masukkan tanggal terlebih dahulu");
  }
}

showData(data);
submitBtn.addEventListener("click", clickSubmit);


