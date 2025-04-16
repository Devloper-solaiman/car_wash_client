import { FC } from 'react';
import {
  IoMdPerson,
  IoMdMail,
  IoMdCall,
  IoMdPin,
  IoMdSend,
} from 'react-icons/io';
import { motion } from 'framer-motion';
import CWForm from '../../components/form/CWForm';
import CWInput from '../../components/form/CWInput';
import CWTextarea from '../../components/form/CWTextarea';
import { Button } from '@nextui-org/react';
import Location from './Location';
import SectionTitle from '../../components/ui/SectionTitle';
import { toast } from 'sonner';
import Container from '../../components/ui/Container';

type TContactUsFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

const ContactUs: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  const onSubmit = (data: TContactUsFormValues) => {
    console.log('Form Submitted:', data);
    if (data) {
      toast.success('Message send successfully');
    }
  };

  return (
    <Container>
      <SectionTitle
        subHeader="Get in Touch"
        header="Contact Us"
        des="We’re here to help with any questions or inquiries. Reach out to us for more information or assistance."
      />

      <div className="mx-2">
        <div className="p-2">
          <motion.div
            className={`flex flex-col`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <CWForm<TContactUsFormValues> onSubmit={onSubmit}>
              <motion.div
                className={`space-y-3 w-full`}
                variants={itemVariants}
              >
                <div className="flex flex-col md:flex-row gap-3 items-center w-full">
                  <CWInput
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    icon={<IoMdPerson className="text-2xl text-warning" />}
                    required
                  />
                  <CWInput
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    icon={<IoMdMail className="text-2xl text-warning" />}
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3 items-center w-full">
                  <CWInput
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    type="tel"
                    icon={<IoMdCall className="text-2xl text-warning" />}
                    required
                  />
                  <CWInput
                    name="address"
                    label="Address"
                    placeholder="Enter your address"
                    icon={
                      <IoMdPin className="text-2xl text-warning pointer-events-none flex-shrink-0" />
                    }
                    required
                  />
                </div>

                <CWTextarea
                  name="message"
                  label="Your Message"
                  placeholder="Write your message here"
                  endContent={
                    <IoMdSend className="text-2xl text-warning pointer-events-none flex-shrink-0" />
                  }
                  variant="bordered"
                  color="warning"
                  rows={5}
                  required
                />
                <div className="flex justify-end">
                  <Button color="warning" variant="flat" type="submit">
                    Send Message
                  </Button>
                </div>
              </motion.div>
            </CWForm>
          </motion.div>
        </div>

        <Location />
      </div>
    </Container>
  );
};

export default ContactUs;
