// ========================================
// KIRBY AUTOMOBILE - Inventory Filter System
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const makeFilter = document.getElementById('makeFilter');
    const priceFilter = document.getElementById('priceFilter');
    const yearFilter = document.getElementById('yearFilter');
    const bodyFilter = document.getElementById('bodyFilter');
    const sortFilter = document.getElementById('sortFilter');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const resetBtn = document.getElementById('resetBtn');
    const carsGrid = document.getElementById('carsGrid');
    const carCount = document.getElementById('carCount');
    const noResults = document.getElementById('noResults');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // Get all car cards
    const getCarCards = () => Array.from(document.querySelectorAll('.car-card'));
    
    // Filter function
    function filterCars() {
        const searchTerm = searchInput?.value.toLowerCase() || '';
        const makeValue = makeFilter?.value || '';
        const priceValue = priceFilter?.value || '';
        const yearValue = yearFilter?.value || '';
        const bodyValue = bodyFilter?.value || '';
        
        const cards = getCarCards();
        let visibleCount = 0;
        
        cards.forEach(card => {
            const name = (card.dataset.name || '').toLowerCase();
            const make = card.dataset.make || '';
            const price = parseInt(card.dataset.price) || 0;
            const year = card.dataset.year || '';
            const type = card.dataset.type || '';
            
            // Search filter
            const matchesSearch = !searchTerm || name.includes(searchTerm) || make.includes(searchTerm);
            
            // Make filter
            const matchesMake = !makeValue || make === makeValue;
            
            // Price filter
            let matchesPrice = true;
            if (priceValue) {
                if (priceValue === '10000000+') {
                    matchesPrice = price >= 10000000;
                } else {
                    const [min, max] = priceValue.split('-').map(Number);
                    matchesPrice = price >= min && price <= max;
                }
            }
            
            // Year filter
            let matchesYear = true;
            if (yearValue) {
                if (yearValue === 'vintage') {
                    matchesYear = parseInt(year) < 2000;
                } else {
                    matchesYear = year === yearValue;
                }
            }
            
            // Body type filter
            const matchesBody = !bodyValue || type === bodyValue;
            
            // Show/hide card
            const isVisible = matchesSearch && matchesMake && matchesPrice && matchesYear && matchesBody;
            card.classList.toggle('hidden', !isVisible);
            
            if (isVisible) visibleCount++;
        });
        
        // Update count
        if (carCount) {
            carCount.textContent = visibleCount;
        }
        
        // Show/hide no results message
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        
        // Sort visible cards
        sortCars();
    }
    
    // Sort function
    function sortCars() {
        const sortValue = sortFilter?.value || 'featured';
        const cards = getCarCards();
        const visibleCards = cards.filter(card => !card.classList.contains('hidden'));
        
        visibleCards.sort((a, b) => {
            const priceA = parseInt(a.dataset.price) || 0;
            const priceB = parseInt(b.dataset.price) || 0;
            const yearA = parseInt(a.dataset.year) || 0;
            const yearB = parseInt(b.dataset.year) || 0;
            const nameA = (a.dataset.name || '').toLowerCase();
            const nameB = (b.dataset.name || '').toLowerCase();
            
            switch (sortValue) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'year-desc':
                    return yearB - yearA;
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                default:
                    return 0; // Featured - keep original order
            }
        });
        
        // Reorder in DOM
        visibleCards.forEach(card => {
            carsGrid.appendChild(card);
        });
    }
    
    // Reset filters
    function resetFilters() {
        if (searchInput) searchInput.value = '';
        if (makeFilter) makeFilter.value = '';
        if (priceFilter) priceFilter.value = '';
        if (yearFilter) yearFilter.value = '';
        if (bodyFilter) bodyFilter.value = '';
        if (sortFilter) sortFilter.value = 'featured';
        filterCars();
    }
    
    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', filterCars);
    }
    
    if (makeFilter) {
        makeFilter.addEventListener('change', filterCars);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterCars);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterCars);
    }
    
    if (bodyFilter) {
        bodyFilter.addEventListener('change', filterCars);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', sortCars);
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', resetFilters);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    // View toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (carsGrid) {
                if (view === 'list') {
                    carsGrid.style.gridTemplateColumns = '1fr';
                } else {
                    carsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
                }
            }
        });
    });
    
    // Favorite button toggle
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (btn.textContent === '♡') {
                btn.textContent = '♥';
                btn.style.color = '#ef4444';
            } else if (btn.textContent === '♥') {
                btn.textContent = '♡';
                btn.style.color = '';
            }
        });
    });
    
    // Initial count
    if (carCount) {
        carCount.textContent = getCarCards().length;
    }
    
    console.log('%c🚗 Kirby Automobile Inventory', 'color: #fff; background: #000; font-size: 14px; padding: 8px;');
});
