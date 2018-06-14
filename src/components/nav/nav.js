/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal nav component.
 */

// Core dependencies
import compStyles from './nav.module.css'
import Link from 'gatsby-link';
import React from 'react';
import * as siteMap from '../../siteMap';

const classNames = require('classnames');
let active;
let expanded;

const getListClassName = (docPath, nav) => {

    console.log(nav.key, docPath);
    active = nav.key === docPath;
    expanded = (active && nav.children);

    return classNames({
        [compStyles.expanded]: expanded,
        [compStyles.selected]: active
    });
};

const Nav = ({docPath}) => (
                <ul className={compStyles.hcaSideNav}>
                    {siteMap.getNav(docPath).map((p, i) =>
                        <div key={i}>
                            <li className={getListClassName(docPath, p)} key={i}><Link to={p.key}>{p.name}</Link></li>
                            {p.children && expanded?
                            <ul>
                                {p.children.map((c, j) => <li key={j}><Link to={c.key}>{c.name}</Link></li>)}
                            </ul> : null}
                        </div>)}
                </ul>
);

export default Nav;
