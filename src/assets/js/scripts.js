/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// window.addEventListener('DOMContentLoaded', event => {
//   // Simple-DataTables
//   // https://github.com/fiduswriter/Simple-DataTables/wiki

//   const datatablesSimple = document.getElementById('datatablesSimple');
//   if (datatablesSimple) {
//       new simpleDatatables.DataTable(datatablesSimple, {
//           labels: {
//               placeholder: "Tìm kiếm...",
//               searchTitle: "Tìm trong bảng",
//               pageTitle: "Trang {page}",
//               perPage: "Số dòng mỗi trang",
//               noRows: "Không tìm thấy",
//               info: "",
//               noResults: "Không tìm thấy kết quả phù hợp",
//           }
//       });

//   }
// });

// $(document).ready(function() {
//   $('#dataTable').DataTable();
// });



function statusFormatter(value) {
    console.log("Status Formatter called with value:", value); 
    if (value == 1) {
      return '<span class="text-success">Hoạt động</span>';
    } else {
      return '<span class="text-danger">Không hoạt động</span>';
    }
  }