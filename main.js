let dataBaseBuku = [];
//[
//   {
//       id: +new Date(),
//       title: judulBuku,
//        author: penulisBuku,
//        year: tahunBuku,
//        isComplete: statusBuku
//    },
//    {
//        id: +new Date(),
//        title: judulBuku,
//        author: penulisBuku,
//        year: tahunBuku,
//        isComplete: statusBuku
//    }
//]
// "[{'id:123,'title':'ABC'},{'id':'123','title':'ABC'}"
if (typeof localStorage === 'undefined'){
    alert("Local Storage belum tersedia gan");
} else {
    const dataBukuDiLocalStorage = localStorage.getItem("dataBaseBuku");
    if (dataBukuDiLocalStorage !== null){
        dataBaseBuku = JSON.parse(dataBukuDiLocalStorage);       
    }
}

renderDataBaseBuku();

function simpanDataBuku() {
    localStorage.setItem("dataBaseBuku", JSON.stringify(dataBaseBuku));
}

function tambahDataBuku() {
    const judulBuku = document.getElementById("inputBookTitle").value;
    const penulisBuku = document.getElementById("inputBookAuthor").value;
    const tahunBuku = document.getElementById("inputBookYear").value;
    const statusBuku = document.getElementById("inputBookIsComplete").checked;

    dataBaseBuku.push({
        id: +new Date(),
        title: judulBuku,
        author: penulisBuku,
        year: tahunBuku,
        isComplete: statusBuku
    });
    simpanDataBuku() 

}

function ubahStatusDataBukuById(bukuId) {
    let targetIndexBuku;

    for (let index = 0; index < dataBaseBuku.length; index++) {
        const buku = dataBaseBuku[index];
        if (buku.id ==  bukuId){
            targetIndexBuku = index;
            break;
        }
    }

    const statusBukuBaru = !dataBaseBuku[targetIndexBuku].isComplete;

    dataBaseBuku[targetIndexBuku] = {
        ...dataBaseBuku[targetIndexBuku],
        isComplete: statusBukuBaru
    }

   simpanDataBuku();
    renderDataBaseBuku(); 
}

function hapusDataBukuById(bukuId) {
    let targetIndexBuku;

    for (let index = 0; index < dataBaseBuku.length; index++) {
        const buku = dataBaseBuku[index];
        if (buku.id ==  bukuId){
            targetIndexBuku = index;
            break;
        }
    }

    dataBaseBuku.splice(targetIndexBuku, 1);

    simpanDataBuku();
    renderDataBaseBuku();
}

function cariDataBukuByJudul(judulBuku) {
    let arrayHasilPencarianBuku = [];

    for (let index = 0; index < dataBaseBuku.length; index++) {
        const buku = dataBaseBuku[index];
        if (buku.title ==  judulBuku){
           arrayHasilPencarianBuku.push(buku);
        }
    }
    if (judulBuku == ""){
        renderDataBaseBuku();
    } else {
        renderDataBaseBuku(arrayHasilPencarianBuku);
    }
}

function renderDataBaseBuku (CustomDataBaseBuku=dataBaseBuku) {
    const kotakBelumSelesai = document.getElementById("incompleteBookshelfList");
    const kotakSudahSelesai = document.getElementById("completeBookshelfList");

    let htmlItemBelumSelesai ="";
    let htmlItemSudahSelesai ="";
    
    for (let index = 0; index < CustomDataBaseBuku.length; index++) {
        const buku = CustomDataBaseBuku[index];
        const htmlBuku = `
        <article class="book_item">
            <h3>${buku.title}</h3>
            <p>Penulis: ${buku.author}</p>
            <p>Tahun: ${buku.year}</p>
   
          <div class="action">
              <button class="green" onclick="ubahStatusDataBukuById(${buku.id})">
               ${buku.isComplete ? "Belum Selesai Dibaca" : "Selesai Dibaca"}
              </button>
              <button class="red" onclick="hapusDataBukuById(${buku.id})">
                Hapus Buku
              </button>
          </div>
      </article>
        `;

        if (buku.isComplete){
            htmlItemSudahSelesai += htmlBuku;
        } else {
            htmlItemBelumSelesai += htmlBuku;
        }
        
    }

    kotakBelumSelesai.innerHTML = htmlItemBelumSelesai;
    kotakSudahSelesai.innerHTML = htmlItemSudahSelesai;

}

const formInputBuku = document.getElementById("inputBook");
formInputBuku.addEventListener("submit",function(event){
    event.preventDefault();

    if (event.submitter.id == "bookSubmit"){
        tambahDataBuku();
        renderDataBaseBuku();
    }
});

const formPencarianBuku = document.getElementById("searchBook");
formPencarianBuku.addEventListener("submit",function(event){
    event.preventDefault();

    const judulBuku = document.getElementById("searchBookTitle").value;
    if (event.submitter.id == "searchSubmit"){
        cariDataBukuByJudul(judulBuku);
    }
})

