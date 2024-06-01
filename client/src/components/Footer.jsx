import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitch, BsGithub, BsLinkedin} from 'react-icons/bs';

function FooterCom() {
     return (
          <Footer container className='border border-t-8 border-teal-500'>
               <div className="w-full max-w-7xl mx-auto">
                    <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                         <div className="mt-5">
                              <Link to="/"
                                   className='font-bold dark:text-white text-4xl'>

                                   <span className='px-2 py-1 
                                   bg-gradient-to-r 
                                   from-indigo-500 
                                   via-purple-500 
                                   to-pink-500 
                                   rounded-lg text-white'>
                                        Jana's
                                   </span>
                                   Blog
                              </Link>
                         </div>
                         <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                              <div>
                                   <Footer.Title title='About' />
                                   <Footer.LinkGroup col>
                                        <Footer.Link
                                             href="#"
                                             target='_blank'
                                             rel='noopener noreferrer'
                                         >
                                             Link 1
                                        </Footer.Link>
                                        <Footer.Link
                                             href="#"
                                             target='_blank'
                                             rel='noopener noreferrer'
                                         >
                                             Link 2
                                        </Footer.Link>
                                   </Footer.LinkGroup>
                              </div>
                              <div>
                                   <Footer.Title title='Follow Us' />
                                   <Footer.LinkGroup col>
                                        <Footer.Link
                                             href="#"
                                             target='_blank'
                                             rel='noopener noreferrer'
                                         >
                                             Link 1
                                        </Footer.Link>
                                        <Footer.Link
                                             href="#"
                                             target='_blank'
                                             rel='noopener noreferrer'
                                         >
                                             Link 2
                                        </Footer.Link>
                                   </Footer.LinkGroup>
                              </div>
                              <div>
                                   <Footer.Title title='Legal' />
                                   <Footer.LinkGroup col>
                                        <Footer.Link
                                             href="#"
                                             target='_blank'
                                             rel='noopener noreferrer'
                                         >
                                             T&C
                                        </Footer.Link>
                                        <Footer.Link
                                             href="#"
                                             target='_blank'
                                             rel='noopener noreferrer'
                                         >
                                             Privacy policy
                                        </Footer.Link>
                                   </Footer.LinkGroup>
                              </div>
                         </div>
                    </div>
                    <Footer.Divider />
                    <div className="">
                         <Footer.Copyright href='#' by="jana's blog" year={new Date().getFullYear()} />
                         <div className="flex gap-3 mt-4  sm:justify-center">
                              <Footer.Icon href='#' icon={BsFacebook} />
                              <Footer.Icon href='#' icon={BsInstagram} />
                              <Footer.Icon href='#' icon={BsGithub} />
                              <Footer.Icon href='#' icon={BsLinkedin} />
                              <Footer.Icon href='#' icon={BsTwitch} />
                         </div>
                    </div>
                    
               </div>
          </Footer>
     )
}

export default FooterCom;