import Reveal from '@/components/layout/Reveal'
import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Content, asText, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
      className={cn('py-8 lg:pb-24', {
        'bg-secondary': slice.variation === 'secondary',
        'bg-primary/70': slice.variation === 'primary',
      })}
    >
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <Heading
                as="h2"
                size="5xl"
                className={cn('py-4 lg:py-8 lg:text-center', {
                  'text-primary-foreground': slice.variation === 'primary',
                })}
              >
                {children}
              </Heading>
            ),
          }}
        />
      )}
      {isFilled.richText(slice.primary.description) && (
        <div
          className={cn('max-w-prose mx-auto', {
            'text-primary-foreground': slice.variation === 'primary',
          })}
        >
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mb-8 prose lg:prose-lg text-foreground">
                  {children}
                </p>
              ),
            }}
          />
        </div>
      )}
      <Reveal
        allowAnimation={slice.primary.allow_animation}
        direction={slice.primary.animation_direction}
      >
        <div className="mt-8 flex flex-wrap justify-evenly gap-12 lg:mt-0 lg:gap-4">
          {slice.items.length > 0 &&
            slice.items.map((item, index) => {
              if (isFilled.richText(item.feature_heading)) {
                return (
                  <Card
                    key={slice.id + index}
                    className={cn('w-[350px]', {
                      'bg-secondary': slice.variation === 'default',
                      'bg-primary/80 text-primary-foreground shadow-lg':
                        slice.variation === 'primary',
                    })}
                  >
                    <CardHeader>
                      <PrismicRichText
                        field={item.feature_heading}
                        components={{
                          heading3: ({ children }) => (
                            <Heading
                              as="h3"
                              size="3xl"
                              className={cn('lg:text-center', {
                                'text-foreground':
                                  slice.variation === 'primary',
                              })}
                            >
                              {children}
                            </Heading>
                          ),
                        }}
                      />
                    </CardHeader>
                    <CardContent>
                      {isFilled.richText(item.feature_description) && (
                        <PrismicRichText
                          field={item.feature_description}
                          components={{
                            paragraph: ({ children }) => (
                              <p className="mb-8 prose text-foreground">
                                {children}
                              </p>
                            ),
                          }}
                        />
                      )}
                      {isFilled.link(item.button_link) && (
                        <CardFooter className="flex justify-center">
                          <Button
                            variant={
                              slice.variation === 'primary'
                                ? 'secondary'
                                : 'default'
                            }
                            asChild
                            className="mt-4 lg:mt-8"
                          >
                            <PrismicNextLink field={item.button_link}>
                              {item.button_label || 'Missing Label'}{' '}
                              <span className="sr-only">
                                About {asText(item.feature_heading)}
                              </span>
                            </PrismicNextLink>
                          </Button>
                        </CardFooter>
                      )}
                    </CardContent>
                  </Card>
                )
              } else return null
            })}
        </div>
      </Reveal>
    </Section>
  )
}

export default Features
