import React, { useState, useRef } from "react";
import { storage, firestore } from "../../../firebase";
import "firebase/firestore";
import Rocket from "./icons/rocket.png";
import Footer from "./Footer";

import ContactForm from "./ContactForm";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visiblebtn, setVisible] = useState(false);
  const [error, setError] = useState(null);

  const now = new Date();
  const timestamp = now.toLocaleString("en-IN", { timeZone: "IST" });

  // Copy FUnction
  const inputRef = useRef(null);

  function handleCopy() {
    const textToCopy = inputRef.current.value;
    navigator.clipboard.writeText(textToCopy);
    setError("Copied");
  }

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  const handleFileInputChange = (event) => {
    inputRef.current.value = null;
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    const openModel = document.getElementById("my-modal-3");
    openModel.click();
    setUploading(true);
    const filetitle = timestamp + "_" + file.name;
    const fileRef = storage.ref().child(`/files/${filetitle}`);
    const uploadTask = fileRef.put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Get the download URL of the uploaded file
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setUploading(false);
          setProgress(0);
          setFile(null);
          console.log("File Uploaded!");
          saveFileDetails(file.name, file.type, downloadURL);
        });
      }
    );
  };

  const saveFileDetails = (filename, filetype, downloadlink) => {
    console.log("Uploded FIle" + downloadlink);
    const input = document.getElementById("copyinput");
    input.value = downloadlink;

    setVisible(true);
    firestore.collection("hostfile").add({
      filename: filename,
      uploadingtime: timestamp,
      filetype: filetype,
      downloadlink: downloadlink,
    });
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div class="flex flex-wrap items-center justify-center mt-2">
          <div class="w-full sm:w-1/2 p-4">
            <div class="border border-white bg-blue-600 rounded-lg p-4">
              <div
                className="flex flex-col justify-center items-center rounded"
                style={{
                  border: "1px dotted white",
                  height: "310px",
                  padding: "5px",
                }}
              >
                <span style={{ width: "120px", height: "120px" }}>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 96 60"
                    fill="#ffff"
                  >
                    <path d="M56.9358018,0.887952143 L87.1245072,1.94216497 L95.1229308,10.5194242 L93.649924,52.7008195 C93.6036653,54.0254955 92.5349073,55.07339 91.2286594,55.11247 L91.0641982,55.1120479 L68.9993032,54.34053 L69,58 C69,59.1045695 68.1045695,60 67,60 L31,60 C29.8954305,60 29,59.1045695 29,58 L28.9993032,54.26853 L4.93575717,55.1094924 C3.61108122,55.1557511 2.49118654,54.162694 2.36108243,52.862354 L2.35003136,52.6982641 L0.67485552,4.72750438 C0.628596816,3.40282843 1.62165394,2.28293375 2.92199388,2.15282964 L3.08608385,2.14177857 L33.2747893,1.08756574 L40.5172077,7.8412302 L40.3683032,7.99952995 L54.1853032,7.99952995 L54.350076,3.29918047 C54.3963347,1.97450452 55.4650927,0.926610013 56.7713406,0.887529955 L56.9358018,0.887952143 Z M59.9993032,8.99952995 L31,9 C30.4871642,9 30.0644928,9.38604019 30.0067277,9.88337887 L30,10 L29.9993032,38.99953 L50,39 C50.5522847,39 51,39.4477153 51,40 L51,51 C51,51.5522847 50.5522847,52 50,52 L29.9993032,51.99953 L30,58 C30,58.5128358 30.3860402,58.9355072 30.8833789,58.9932723 L31,59 L67,59 C67.5128358,59 67.9355072,58.6139598 67.9932723,58.1166211 L68,58 L67.9993032,16.99953 L60,17 L59.9993032,8.99952995 Z M56.9009023,1.88734297 C56.1216811,1.86013197 55.4605576,2.43229572 55.3613708,3.1899476 L55.3494668,3.33407997 L55.1863032,7.99952995 L61,8 L69,16 L68.9991926,25.6289267 C70.5660308,24.8310303 72.3185302,24.4353033 74.1222153,24.4982894 C79.9176726,24.7006712 84.4517561,29.5628805 84.2493743,35.3583378 C84.0469925,41.1537951 79.1847832,45.6878786 73.3893259,45.4854968 C71.8381588,45.4313288 70.3473363,45.0415105 68.9989737,44.3553556 L68.9993032,53.34053 L91.0990977,54.112657 C91.8783189,54.139868 92.5394424,53.5677043 92.6386292,52.8100524 L92.6505332,52.66592 L94.0793032,11.69053 L86.5859814,11.4291499 L85.5865905,11.3942504 L85.8833032,2.89752995 L56.9009023,1.88734297 Z M32.1023032,2.12752995 L3.12098334,3.1411694 C2.34176219,3.1683804 1.72216126,3.78526803 1.67606716,4.54799323 L1.67424635,4.69260488 L3.34942219,52.6633646 C3.37663319,53.4425857 3.99352083,54.0621867 4.75624602,54.1082808 L4.90085767,54.1101016 L28.9993032,53.26853 L28.9993032,51.99953 L28,52 C27.4477153,52 27,51.5522847 27,51 L26.9993032,44.83453 L19.5950841,45.0933432 L19.595119,45.0943425 L18.5957281,45.129242 L18.5956932,45.1282427 L13.5987391,45.3027401 L13.598774,45.3037395 L12.5993832,45.338639 L11.8664937,24.3514317 L28.9993032,23.75253 L29,10 C29,8.8954305 29.8954305,8 31,8 L32.3073032,7.99952995 L32.1023032,2.12752995 Z M59,50 L59,51 L53,51 L53,50 L59,50 Z M32.3146067,42 L30,42 L30,49 L31.3033708,49 L31.3033708,46.4311927 L32.3595506,46.4311927 C33.9438202,46.4311927 35.1573034,45.7140673 35.1573034,44.1620795 C35.1573034,42.5351682 33.9438202,42 32.3146067,42 Z M38.505618,42 L36.5393258,42 L36.5393258,49 L38.5730337,49 C40.752809,49 42.0786517,47.7905199 42.0786517,45.4678899 C42.0786517,43.1559633 40.752809,42 38.505618,42 Z M48,42 L43.5617978,42 L43.5617978,49 L44.8651685,49 L44.8651685,46.0779817 L47.5393258,46.0779817 L47.5393258,45.029052 L44.8651685,45.029052 L44.8651685,43.0489297 L48,43.0489297 L48,42 Z M38.4157303,43.0061162 C39.8988764,43.0061162 40.741573,43.7553517 40.741573,45.4678899 C40.741573,47.1222018 39.9649438,47.9281908 38.5906208,47.990023 L38.4157303,47.9938838 L37.8426966,47.9938838 L37.8426966,43.0061162 L38.4157303,43.0061162 Z M59,45 L59,46 L53,46 L53,45 L59,45 Z M32.2134831,42.9954128 C33.3033708,42.9954128 33.8764045,43.2844037 33.8764045,44.1620795 C33.8764045,44.9679799 33.4086155,45.3851518 32.4449351,45.4314423 L32.258427,45.4357798 L31.3033708,45.4357798 L31.3033708,42.9954128 L32.2134831,42.9954128 Z M69.0265641,26.7510919 L68.9993032,26.76653 L68.9996167,43.2178828 C70.3344397,43.991422 71.8438183,44.4309169 73.4242254,44.4861059 C78.3287144,44.6573745 82.4944919,41.0794986 83.1625055,36.3253363 L73.720804,35.9951266 L74.0873158,25.4976802 L74.0873158,25.4976802 C72.2889112,25.4348785 70.5488066,25.8752929 69.0265641,26.7510919 Z M18.4212307,40.1322879 L13.4242765,40.3067854 L13.5638396,44.3033493 L18.5607937,44.1288518 L18.4212307,40.1322879 Z M27.0141292,39.8315388 L19.4206215,40.0973884 L19.5601846,44.0939523 L26.9993032,43.83453 L27,40 C27,39.9425877 27.0048382,39.8863055 27.0141292,39.8315388 Z M59,40 L59,41 L53,41 L53,40 L59,40 Z M18.2467332,35.1353338 L13.249779,35.3098313 L13.389377,39.3073946 L18.3863312,39.1328971 L18.2467332,35.1353338 Z M28.9993032,34.75853 L19.246124,35.1004343 L19.385722,39.0979976 L28.9993032,38.76153 L28.9993032,34.75853 Z M59,35 L59,36 L39,36 L39,35 L59,35 Z M18.0722357,30.1383796 L13.0752816,30.3128771 L13.2148795,34.3104404 L18.2118337,34.1359429 L18.0722357,30.1383796 Z M28.9993032,29.75553 L19.0716265,30.1034801 L19.2112245,34.1010435 L28.9993032,33.75853 L28.9993032,29.75553 Z M59,30 L59,31 L39,31 L39,30 L59,30 Z M17.8977382,25.1414255 L12.9007841,25.315923 L13.0403821,29.3134863 L18.0373362,29.1389888 L17.8977382,25.1414255 Z M28.9993032,24.75353 L18.897129,25.106526 L19.036727,29.1040893 L28.9993032,28.75553 L28.9993032,24.75353 Z M60.9993032,9.41452995 L60.9993032,15.99953 L67.5843032,15.99953 L60.9993032,9.41452995 Z M86.8743032,3.14052995 L86.6203032,10.42953 L93.9093032,10.68353 L86.8743032,3.14052995 Z M33.1093032,2.29952995 L33.3083032,7.99952995 L39.2203032,7.99952995 L33.1093032,2.29952995 Z"></path>
                  </svg>
                </span>
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  class="file-input file-input-bordered w-full max-w-xs mt-2"
                />
                {file && (
                  <div className="flex items-center flex-col">
                    <p className="text-white text-center mt-2">
                      Selected file: {file.name}
                    </p>
                    <button
                      className="btn btn-outline mt-2"
                      onClick={handleFileUpload}
                      disabled={uploading}
                    >
                      Upload
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div class="w-full sm:w-1/2 p-4">
            <h1 class="text-3xl font-bold">Free File Hosting</h1>
            <p>
              We offering free file hosting, provide users with a convenient and
              reliable way to store and share their files without having to
              spend any money.
            </p>
          </div>
        </div>

        <br />
        <br />
        {/* Service Faster */}
        <h1 className="text-3xl text-center font-bold mt-5">
          Work Faster With Smaller PDF Files
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 sm:ml-2 sm:mr-2">
          <div class="bg-base-300 text-base-content h-30 p-2 rounded">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1356/1356479.png"
              className="w-20 h-20"
              alt="Fast Uploading"
            />
            <h2 className="text-xl">Fast Uploading</h2>
            <p>Dont need to login,just upload your file.</p>
          </div>
          <div class="bg-base-300 text-base-content h-50 p-3 rounded">
            <img
              className="w-20 h-20"
              src="https://cdn-icons-png.flaticon.com/128/3073/3073412.png"
              alt="Support All types of Files"
            />
            <h2 className="text-xl">Supported All Files Types</h2>
            <p>We have provide all types of file that can be uploaded here</p>
          </div>
          <div class="bg-base-300 text-base-content h-50 p-3 rounded">
            <img
              className="w-20 h-20"
              src="https://cdn-icons-png.flaticon.com/512/1161/1161388.png"
              alt="Secured"
            />
            <h2 className="text-xl">Secured Upload / Download</h2>
            <p>
              The Firebase is more efficient & RTDBMS provide to store files or
              data.{" "}
            </p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <br />
        <br />
        <div className="container-md px-4 mt-5">
          {" "}
          <h1 className="text-3xl font-bold mt-5 mb-3">
            FAQs About Our File Hosting Tool
          </h1>
          <h2 className="text-lg font-bold">
            Q: What type of files can I upload to your website?
          </h2>
          <p>
            A: You can upload almost any type of file, including documents,
            images, audio files, and videos. However, we do not allow any files
            that violate our terms of service, including copyrighted material or
            illegal content.
          </p>
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: How long will my files stay on your website?
          </h2>
          <p>
            A: Your files will stay on our website as long as you keep the
            download link active or until they are deleted due to inactivity. We
            reserve the right to remove any files that violate our terms of
            service or are inactive for a period of time.
          </p>
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: Is there a limit to how much I can upload?
          </h2>
          <p>
            A: We have a file size limit of 5GB per file, but there is no limit
            to how many files you can upload.
          </p>
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: Do I need to create an account to use your website?
          </h2>
          <p>
            A: No, you do not need to create an account to use our website.
            However, if you create an account, you can keep track of your
            uploaded files and manage them more easily.
          </p>
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: Can I share my files with others?
          </h2>
          <p>
            A: Yes, you can share your files by sharing the download link with
            others. However, please be aware that anyone with the download link
            can access your file, so be careful who you share it with.
          </p>
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: Are my files secure on your website?
          </h2>
          <p>
            A: We take security very seriously and do our best to protect your
            files. All files are stored on our secure servers and are encrypted
            during transmission. However, we cannot guarantee 100% security, so
            please use our service at your own risk.
          </p>
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: Do you have any restrictions on how many times my files can be
            downloaded?
          </h2>
          <p>
            A: No, there is no limit on how many times your files can be
            downloaded.
          </p>
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: Can I delete my files from your website?
          </h2>
          <p>
            A: Yes, you can delete your files at any time by using the delete
            button on your file's download page.
          </p>{" "}
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: Do you have any premium plans or features?
          </h2>
          <p>
            A: Currently, we only offer our free file hosting service. However,
            we may consider adding premium plans or features in the future.
          </p>{" "}
          <div class="divider"></div>
          <h2 className="text-lg font-bold">
            Q: How can I contact you if I have any issues or questions?
          </h2>
          <p>
            A: You can contact us through our support page, and we will do our
            best to assist you as soon as possible.
          </p>
        </div>

        {/* Uploading Modal */}

        {/* Put this part before </body> tag */}
        <input
          type="checkbox"
          id="my-modal-3"
          className="modal-toggle"
          style={{ display: "none" }}
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              File {progress != 100 && <>Uploading {progress} %</>}{" "}
              {progress === 100 && <>File Uploaded Successfully {progress} %</>}
            </h3>
            <p className="py-4">
              {uploading && (
                <div className="relative w-full h-4 mt-4 bg-gray-200 rounded">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-600 rounded"
                    style={{ width: `${progress}%` }}
                  ></div>{" "}
                </div>
              )}
              <p>Link will Genearating Below</p>
              {/* Get Link */}

              <div className="form-control mt-2">
                <input
                  type="text"
                  className="input input-bordered"
                  id="copyinput"
                  readOnly
                  ref={inputRef}
                />
              </div>
              <button
                className="btn btn-success mt-2 text-white"
                onClick={handleCopy}
              >
                Copy
              </button>

              {error && (
                <span className="text-success font-bold mt-2">{error}</span>
              )}
            </p>

            {visiblebtn && (
              <label
                for="my-modal-3"
                class="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
            )}
          </div>
        </div>

        {/* Privacy Modal */}
        <>
          {/* The button to open modal */}
          <div className="modal" id="my-modal-4">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Privacy Policy</h3>
              <p className="py-4">
                <p>
                  We take your privacy seriously and are committed to protecting
                  your personal information. This Privacy Policy explains how we
                  collect, use, and disclose your information when you use our
                  file hosting service.
                </p>

                <h2 className="text-lg font-bold">Information We Collect</h2>
                <ul>
                  <li>
                    We collect personal information such as your name and email
                    address when you register for an account.
                  </li>
                  <li>
                    We collect information about the files you upload and store
                    on our servers.
                  </li>
                  <li>
                    We also collect information about your device, browser, and
                    IP address.
                  </li>
                </ul>

                <h2 className="text-lg font-bold">
                  How We Use Your Information
                </h2>
                <ul>
                  <li>
                    We use your personal information to create and maintain your
                    account, communicate with you, and provide customer support.
                  </li>
                  <li>
                    We use your file information to provide our file hosting
                    service and to improve our service.
                  </li>
                  <li>
                    We use your device, browser, and IP address information to
                    detect and prevent fraudulent or malicious activity.
                  </li>
                </ul>

                <h2 className="text-lg font-bold">
                  How We Share Your Information
                </h2>
                <ul>
                  <li>
                    We may share your personal information with our service
                    providers who help us provide our file hosting service.
                  </li>
                  <li>
                    We may share your file information with our service
                    providers who help us provide our file hosting service, but
                    we will not share your files with third parties without your
                    consent, except as required by law.
                  </li>
                </ul>

                <h2 className="text-lg font-bold">Data Retention</h2>
                <ul>
                  <li>
                    We retain your personal information as long as necessary to
                    provide our file hosting service and as required by law.
                  </li>
                  <li>
                    We retain your file information as long as you store your
                    files on our servers.
                  </li>
                </ul>

                <h2 className="text-lg font-bold">Security</h2>
                <ul>
                  <li>
                    We take reasonable steps to protect your information from
                    unauthorized access, disclosure, or destruction.
                  </li>
                  <li>
                    We use industry-standard encryption to protect your
                    information when it is transmitted over the internet.
                  </li>
                </ul>

                <h2 className="text-lg font-bold">Changes to this Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  our website.
                </p>
              </p>
              <div className="modal-action">
                <a href="#" className="btn">
                  close
                </a>
              </div>
            </div>
          </div>
        </>

        {/* Terms Modal */}
        <>
          {/* The button to open modal */}
          <div className="modal" id="my-modal-5">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Terms of Use</h3>
              <p className="py-4">
                <h2 className="text-lg font-bold">1. Use of Service</h2>
                <p>
                  You may only use our file hosting service to store and share
                  files that you have the right to store and share.
                </p>

                <h2 className="text-lg font-bold">2. Prohibited Use</h2>
                <p>
                  You may not use our file hosting service to store or share
                  files that are illegal, harmful, or infringe on the rights of
                  others.
                </p>

                <h2 className="text-lg font-bold">3. Account Security</h2>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account login information and for any activity that
                  occurs under your account.
                </p>

                <h2 className="text-lg font-bold">4. Account Termination</h2>
                <p>
                  We reserve the right to terminate your account and delete your
                  files if you violate these terms of use or for any other
                  reason at our discretion.
                </p>

                <h2 className="text-lg font-bold">5. Service Warranties</h2>
                <p>
                  We provide our file hosting service "as is" without any
                  warranties, express or implied. We do not guarantee that our
                  service will be uninterrupted or error-free, or that your
                  files will be stored or shared successfully.
                </p>
                <h2 className="text-lg font-bold">
                  6. Limitation of Liability
                </h2>
                <p>
                  We are not liable for any direct, indirect, incidental, or
                  consequential damages arising out of or in connection with
                  your use of our file hosting service.
                </p>
                <h2 className="text-lg font-bold">7. Indemnification</h2>
                <p>
                  You agree to indemnify and hold us harmless from any and all
                  claims, damages, and expenses arising out of or in connection
                  with your use of our file hosting service.
                </p>
                <h2 className="text-lg font-bold">8. Governing Law</h2>
                <p>
                  These terms of use are governed by the laws of the
                  jurisdiction in which we are located.
                </p>
                <h2 className="text-lg font-bold">
                  9. Changes to this Agreement
                </h2>
                <p>
                  We may update these terms of use from time to time. We will
                  notify you of any changes by posting the new terms of use on
                  our website.
                </p>
                <h2 className="text-lg font-bold">10. Contact Us</h2>
                <p>
                  If you have any questions about these terms of use or our file
                  hosting service, please contact us at [insert contact
                  information].
                </p>
              </p>
              <div className="modal-action">
                <a href="#" className="btn">
                  close
                </a>
              </div>
            </div>
          </div>
        </>
        <br />
        <br />
        <ContactForm />
      </div>
      <br />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default FileUploader;
