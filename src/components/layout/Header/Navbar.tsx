'use client'
import { cn } from '@/lib/utils'
import {
  ImageField,
  isFilled,
  KeyTextField,
  LinkField,
} from '@prismicio/client'
import React, { useRef, useState } from 'react'
import Section from '../Section'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { buttonVariants } from '@/components/ui/button'
import DesktopMenu from './DesktopMenu'
import { LayoutDocumentDataNavigationItem } from '../../../../prismicio-types'
import MobileMenu from './MobileMenu'
import Heading from '@/components/typography/Heading'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'

type NavbarProps = {
  navigation: Array<LayoutDocumentDataNavigationItem>
  cta_link: LinkField
  cta_label: KeyTextField
  logo: ImageField
  site_title: KeyTextField
}

const Navbar = ({
  logo,
  navigation,
  cta_link,
  cta_label = 'Take Action',
  site_title,
}: NavbarProps) => {
  const container = useRef(null)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous: number = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else if (latest === 0) {
      setHidden(false)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      ref={container}
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={cn(
        'sticky top-0 z-20 w-full bg-background transition duration-300 ease-in-out'
      )}
    >
      <Section
        width="xl"
        padded={false}
        className="py-1 md:py-2 lg:py-3 px-2 md:px-3"
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            {isFilled.image(logo) ? (
              <div className="flex items-center">
                <PrismicNextImage
                  field={logo}
                  imgixParams={{ ar: '1:1', fit: 'crop' }}
                  height={60}
                  width={60}
                />
                {isFilled.keyText(site_title) && (
                  <Heading
                    as="h1"
                    size="2xl"
                    className="p-1.5 text-primary-foreground"
                  >
                    {site_title}
                  </Heading>
                )}
              </div>
            ) : (
              <Heading as="h1" size="xl" className="p-1.5">
                {site_title}
              </Heading>
            )}
          </Link>
          <div className="flex items-center gap-x-4 lg:gap-x-8">
            {navigation.length > 0 && (
              <>
                <DesktopMenu navigation={navigation} />
                <MobileMenu
                  site_title={site_title}
                  navigation={navigation}
                  logo={logo}
                />
              </>
            )}

            {isFilled.link(cta_link) && (
              <PrismicNextLink
                field={cta_link}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'hidden md:inline-flex'
                )}
              >
                {cta_label}
              </PrismicNextLink>
            )}
          </div>
        </div>
      </Section>
    </motion.header>
  )
}

export default Navbar
