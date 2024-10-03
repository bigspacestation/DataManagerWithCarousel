$(document).ready(function() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    const carouselInner = $('.carousel-inner');
    const carouselIndicators = $('.carousel-indicators');

    records.forEach((record, index) => {
        const isActive = index === 0 ? 'active' : '';
        const slide = `
            <div class="carousel-item ${isActive}">
                <img src="${record.image || 'assets/default-image.svg'}" class="d-block mx-auto" alt="${record.name}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${record.name}</h5>
                    <p>${record.email}</p>
                </div>
            </div>
        `;
        carouselInner.append(slide);

        const indicator = `<li data-target="#recordCarousel" data-slide-to="${index}" class="${isActive}"></li>`;
        carouselIndicators.append(indicator);
    });

    if (records.length === 0) {
        carouselInner.append(`
            <div class="carousel-item active">
                <div class="text-center">
                    <h3>No records found</h3>
                    <p>Add some records to see them in the carousel</p>
                </div>
            </div>
        `);
    }
});
