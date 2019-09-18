import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { inputComponent } from './pages/components/input/input'
import { iconComponent } from './pages/components/icon/icon'
import { tagComponent } from './pages/components/tag/tag'
import { tagEditComponent } from './pages/components/tagEdit/tagEdit'
import { comComponent } from './pages/components/com/com'

const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    {
        path: 'welcome',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
        data: {
            key: 'home',
            name: '首页',
            link: '/welcome'
        }
    },
    {
        path: 'components',
        children: [
            {
                path: 'input',
                component: inputComponent,
                data: {
                    key: 'com_input',
                    name: '输入框',
                    link: '/components/input',
                    icon: 'edit'
                }
            },
            {
                path: 'icon',
                component: iconComponent,
                data: {
                    key: 'com_icon',
                    name: 'iconfont',
                    link: '/components/icon',
                    icon: 'star'
                }
            },
            {
                path: 'tag',
                component: tagComponent,
                data: {
                    key: 'com_tag',
                    name: '两种TAG',
                    link: '/components/tag',
                    icon: 'tag'
                }
            },
            {
                path: 'tagEdit',
                component: tagEditComponent,
                data: {
                    key: 'com_tag_edit',
                    name: '用户新增',
                    link: '/components/tagEdit',
                }
            },
            {
                path: 'com',
                component: comComponent,
                data: {
                    key: 'com_com',
                    name: '自定义组件',
                    link: '/components/com',
                    icon: 'codepen'
                }
            },
        ],
        data: {
            key: 'com',
            name: '常用组件',
            link: '/components',
            icon: 'appstore'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
