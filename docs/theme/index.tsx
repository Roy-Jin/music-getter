import {
    HomeLayout as BasicHomeLayout,
    PackageManagerTabs,
} from '@rspress/core/theme-original';
import './index.css';

function HomeLayout() {
    return (
        <BasicHomeLayout
            afterHeroActions={
                <div
                    className="rp-doc"
                    style={{ width: '100%', maxWidth: 450, margin: '-1rem 0' }}
                >
                    <PackageManagerTabs command={{
                        npm: "npm install ncmget@latest -g",
                        yarn: "yarn global add ncmget@latest",
                        pnpm: "pnpm add ncmget@latest -g",
                    }} />
                </div>
            }
        />
    );
}

export * from '@rspress/core/theme-original';
export {
    HomeLayout
}