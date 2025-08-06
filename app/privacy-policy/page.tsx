"use client";
import { motion } from 'framer-motion';
import { Shield, FileText, Users, Cookie, Calendar, Lock, Mail, Phone } from 'lucide-react';

const easeOut = "easeOut";

const policySection = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.section
        className="py-24 md:py-32"
        initial="hidden"
        animate="visible"
        variants={policySection}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-primary mb-4"
              variants={policySection}
            >
              Data Privacy Policy for TaskSystems
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-muted-foreground"
              variants={policySection}
            >
              Last Revised: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </motion.p>
          </div>

          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none space-y-8"
            variants={policySection}
          >
            <p className="lead">
              At TaskSystems, we are committed to protecting your privacy and ensuring the security of your personal data. This Data Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you interact with our website, including through our Newsletter subscription form and Career page.
            </p>
            <p>
              By using our website, you consent to the practices described in this policy. If you do not agree with our policies, please refrain from using our services.
            </p>

            {/* Section 1 */}
            <h2 className="flex items-center gap-3"><FileText className="text-primary"/>1. Information We Collect</h2>
            <p><strong>a. Newsletter Subscription Form:</strong> When you subscribe to our newsletter, we collect your Name (to personalize communications) and Email address (to send newsletters and updates).</p>
            <p><strong>b. Career Page:</strong> Our career page may collect applicant information, including: Full name, Email address, Phone number, Resume/CV, Cover letter (optional), and other relevant employment details. <br/><em>Note: Our career page is periodically reviewed to ensure information accuracy. If you notice outdated job postings, please contact us at <a href="mailto:humancapital@tasksystems.com" className="text-primary hover:underline">humancapital@tasksystems.com</a>.</em></p>
            <p><strong>c. Automatically Collected Data:</strong> We may also gather your IP address, browser type & device information, and cookies & tracking data.</p>

            {/* Section 2 */}
            <h2 className="flex items-center gap-3"><Users className="text-primary"/>2. How We Use Your Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg border"><strong>Purpose:</strong> Sending newsletters & updates<br/><strong>Legal Basis:</strong> Consent</div>
              <div className="bg-card p-4 rounded-lg border"><strong>Purpose:</strong> Processing job applications<br/><strong>Legal Basis:</strong> Contractual necessity</div>
              <div className="bg-card p-4 rounded-lg border"><strong>Purpose:</strong> Improving website experience<br/><strong>Legal Basis:</strong> Legitimate interest</div>
              <div className="bg-card p-4 rounded-lg border"><strong>Purpose:</strong> Compliance with legal obligations<br/><strong>Legal Basis:</strong> Legal requirement</div>
            </div>

            {/* Section 3 */}
            <h2 className="flex items-center gap-3"><Shield className="text-primary"/>3. Data Sharing & Disclosure</h2>
            <p>We do not sell or rent your personal data. However, we may share information with: Service Providers (email marketing platforms, HR software), Legal Authorities (if required by law), and Business Partners (only with explicit consent).</p>

            {/* Section 4 */}
            <h2 className="flex items-center gap-3"><Cookie className="text-primary"/>4. Cookies Policy</h2>
            <p>We use cookies to enhance user experience. You can manage preferences via your browser settings.</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr><th className="p-2 border text-left">Cookie Type</th><th className="p-2 border text-left">Purpose</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border">Essential</td><td className="p-2 border">Website functionality</td></tr>
                  <tr><td className="p-2 border">Analytics</td><td className="p-2 border">Traffic analysis</td></tr>
                  <tr><td className="p-2 border">Marketing</td><td className="p-2 border">Ad personalization</td></tr>
                </tbody>
              </table>
            </div>

            {/* Section 5 */}
            <h2 className="flex items-center gap-3"><Calendar className="text-primary"/>5. Data Retention & Security</h2>
            <p>Newsletter data is stored until you unsubscribe. Job applicant data is retained for 6 months unless otherwise requested. We implement SSL encryption, firewalls, and access controls to protect your data.</p>

            {/* Section 6 */}
            <h2 className="flex items-center gap-3"><Lock className="text-primary"/>6. Your Rights Under GDPR & CCPA</h2>
            <p>You have the right to: Access, correct, or delete your data, withdraw consent (for newsletters), opt out of data sales (if applicable), and lodge a complaint with a supervisory authority.</p>
            <p>To exercise these rights, contact: <a href="mailto:compliancehelpdesk@tasksystems.com" className="text-primary hover:underline">compliancehelpdesk@tasksystems.com</a></p>

            {/* Section 7 */}
            <h2 className="flex items-center gap-3">7. Updates to This Policy</h2>
            <p>We may revise this policy periodically. Changes will be posted on this page with an updated “Last Revised” date.</p>

            {/* Section 8 */}
            <h2 className="flex items-center gap-3">8. Contact Us</h2>
            <div className="space-y-4">
              <p className="flex items-center gap-3"><Mail className="text-primary"/>For privacy-related inquiries, email: <a href="mailto:privacy@tasksystems.com" className="text-primary hover:underline">privacy@tasksystems.com</a></p>
              <p className="flex items-center gap-3"><Phone className="text-primary"/>For career page updates, email: <a href="mailto:humancapital@tasksystems.com" className="text-primary hover:underline">humancapital@tasksystems.com</a></p>
            </div>

            <div className="text-center pt-8">
              <p className="font-bold text-lg">TaskSystems</p>
              <p>By using TaskSystems’ website, you acknowledge that you have read and understood this Data Privacy Policy.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}