import humanCheckCategories from './human-check/categories';
import humanCheckFirebase from './human-check/firebase';
import frontendCategories from './frontend/categories';
import frontendFirebase from './frontend/firebase';

const createConfig = ({ categories, firebase }) => {
    return { categories, firebase };
}

export default (() => {
    const app = process.env.REACT_APP_TYPE;    
    switch (app) {
        case 'human-check':
            return createConfig({ categories: humanCheckCategories, firebase: humanCheckFirebase });
        default:
            return createConfig({ categories: frontendCategories, firebase: frontendFirebase })
    }

})();
