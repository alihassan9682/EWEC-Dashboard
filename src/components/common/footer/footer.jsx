import {  Fragment } from 'react';


const Footer = () => {
  return (
    <Fragment>
      <footer className="footer mt-auto xl:ps-[15rem]  font-normal font-inter bg-gray-50 text-defaultsize leading-normal text-[0.813] shadow-[0_0_0.4rem_rgba(0,0,0,0.1)] dark:bg-bodybg py-4 text-center">
        <div className="container">
          <span className="text-gray dark:text-defaulttextcolor/50">
            {" "}
            Copyright © <span id="year">2024</span>{" "}
            <a
              href="#"
              className="text-defaulttextcolor font-semibold dark:text-defaulttextcolor"
            >
              INSPECTION MANAGEMENT SYSTEM 
            </a>
           {" "} Developed by{" "}
            <a href="https://www.labware.com/?utm_term=labware%20lims&utm_campaign=LW_ENG_Brand+Search&utm_source=adwords&utm_medium=ppc&hsa_acc=1902638030&hsa_cam=12087167940&hsa_grp=121695013412&hsa_ad=532158340952&hsa_src=g&hsa_tgt=aud-1003177295713:kwd-869015496647&hsa_kw=labware%20lims&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjw65-zBhBkEiwAjrqRMPfAdaM9gsfVbYvmvH0bMbOcY4KNPvtumAZRuAOTUb4wozgrhnP9BBoCk1AQAvD_BwE">
              <span className="font-semibold text-sky-700 underline">
                LABWARE
              </span>
            </a>{" "}
            All rights reserved
          </span>
        </div>
      </footer>
    </Fragment>
  );
}
export default Footer;
