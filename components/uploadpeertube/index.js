

if (typeof _Electron !== 'undefined') {
	ipcRenderer = require('electron').ipcRenderer;

}

var uploadpeertube = (function () {
	var self = new nModule();

	var essenses = {};

	var ed = {};

	var Essense = function (p) {
		var primary = deep(p, 'history');

		var el, error;

		var wnd;
		var wndObj;
		var errorcomp = null;

		var xhrRequest;

		var actions = {};

		var events = {
			validateFile: (file) =>
				new Promise((resolve, reject) => {
					var video = document.createElement('video');
					video.preload = 'metadata';

					video.onloadedmetadata = () => {
						window.URL.revokeObjectURL(video.src);

						resolve();

						/*// to bits and then to bitrate
						var averageBitrate = (8 * file.size) / video.duration;

						return averageBitrate > 8000000
						  ? reject({
							  text: self.app.localization.e('videoBitrateError'),
							})
						  : resolve();*/
					};

					video.src = URL.createObjectURL(file);
				}),
		};

		var renders = {
			videoErrorContainer: function () {

				var errorel = el.c.find('.videoErrorContainer')


				if (errorel.length) {

					if (errorcomp) {
						errorcomp.destroy()
						errorcomp = null
					}

					self.nav.api.load({
						open: true,
						id: 'abilityincrease',
						el: errorel,

						essenseData: {
							template: 'video'
						}
					}, function (v, p) {
						errorcomp = p
					})
				}

			},
		};

		var videoId,
			loadedImage = null;

		var state = {
			save: function () { },
			load: function () { },
		};

		var initEvents = function () {
			el.c.find('.buypkoins').on('click', function () {
				self.closeContainer();

				self.nav.api.load({
					open: true,
					href: 'wallet',
					history: true,
					inWnd: true,

					essenseData: {
						simple: true,
						action: 'buy',
					},
				});
			});

			el.c.find('.tooltip').tooltipster({
				theme: 'tooltipster-light',
				maxWidth: 600,
				zIndex: 1006,
				position: 'bottom',
				contentAsHTML: true,
			});



			el.videoInput.change(async function (evt) {
				var fileName = evt.target.files[0].name;

				el.videoError.text(
					fileName.slice(0, 20) + (fileName.length > 20 ? '...' : ''),
				);

				el.videoError.removeClass('error-message');
				var videoInputFile = el.videoInput.prop('files');
				var videoName = wnd.find('.upload-video-name').val();
				var nameError = wnd.find('.name-type-error');

				nameError.text('');

				console.log('videoInputFile[0].size', videoInputFile[0].size);

				if (videoInputFile[0].size > 4 * 1024 * 1024 * 1024) {
					el.videoError.text(self.app.localization.e('videoSizeError'));
					el.videoError.addClass('error-message');

					return;
				}

				// validation
				if (!videoInputFile[0]) {
					el.videoError.text('No video selected');
					el.videoError.addClass('error-message');

					return;
				}

				if (!videoInputFile[0].type.includes('video')) {
					el.videoError.text('Incorrect video format');
					el.videoError.addClass('error-message');

					return;
				}

				ed.uploadInProgress = true;
				el.header.removeClass('activeOnRolled');
				el.uploadButton.prop('disabled', true);

				//var transcoded = await self.app.peertubeHandler.transcode(videoInputFile[0])

				var data = {
					//transcoded : transcoded,
					video: videoInputFile[0],
				};

				data.name = videoName || fileName;

				await Promise.all(Object.values(data.video));

				var options = {
					type: 'uploadVideo',
				};

        function setBarProgress(percent) {
          el.uploadProgress
            .find('.upload-progress-bar')
            .css('width', percent + '%');
          el.uploadProgress
            .find('.upload-progress-percentage')
            .text(percent + '%');
        }

        function loadProgress(percentComplete, showFinalPreloader = false) {
          let progress = Math.floor(percentComplete).toString(10);

          const progress100 = (progress >= 100);
          const isPreloaderHidden = el.preloaderElement.hasClass('hidden');

          if (progress100 && showFinalPreloader && isPreloaderHidden) {
            setTimeout(() => {
              el.preloaderElement.removeClass('hidden');
            }, 1000);
          }

          setBarProgress(progress);
        }

        function initCancelListener(cancel) {
          const cancelCloseFunction = () => {
            if (typeof cancel === 'function') cancel();

						self.closeContainer()
					};

					ed.cancelCloseFunction = cancelCloseFunction;

          el.cancelButton.one('click', () => {
            el.uploadProgress.addClass('hidden');

            setBarProgress('0');

            el.cancelButton.addClass('hidden');
            el.importUrl.removeClass('hidden');

            ed.uploadInProgress = false;
            cancel();

            el.videoInput.val('');
            el.wallpaperError.text('');

            el.uploadButton.prop('disabled', false);
            el.header.addClass('activeOnRolled');
            el.uploadProgress.addClass('hidden');
          });

          el.cancelButton.removeClass('hidden');
        }

				el.importUrl.addClass('hidden');

				if (typeof _Electron !== 'undefined') {
					const filePath = evt.target.files[0].path;

					const videoProcessor = transcodingFactory(electron.ipcRenderer);

					try {
						el.cancelButton.addClass('hidden');

						let binProcessing = false;
						const progressBinaries = (progress) => {
							if (!binProcessing && progress !== 100) {
                loadProgress(0);

								el.uploadProgress.find('.bold-font')
									.text(self.app.localization.e('uploadVideoProgress_binaries'))
									.removeClass('uploading')
									.addClass('binaries');

								el.uploadProgress.find('.bold-font')
									.text(self.app.localization.e('uploadVideoProgress_binaries'))

								el.uploadProgress.removeClass('hidden');

								binProcessing = true;
							}

              loadProgress(progress);
						};

						await videoProcessor.downloadBinaries(progressBinaries);

						let videoTranscoding = false;
						const progressTranscode = (progress) => {
							if (!videoTranscoding) {
                loadProgress(0);

								el.uploadProgress
									.find('.upload-progress-bar')
									.removeClass('uploading binaries')
									.addClass('processing');

								el.uploadProgress.find('.bold-font')
									.text(self.app.localization.e('uploadVideoProgress_processing'))

								el.uploadProgress.removeClass('hidden');

								videoTranscoding = true;
							}

              loadProgress(progress);
						};

						const transcoded = await videoProcessor.transcode(filePath, progressTranscode, initCancelListener);

						/** Writing transcoded alternatives to target object */
						/** At this moment for backend reasons, sending only 720p */

						if (!transcoded) {
							return;
						}

						data.video = new File([transcoded.p720.buffer], data.video.name, { type: 'video/mp4' });
					} catch (err) {
						const isCanceledByUser = (err.message === 'TRANSCODE_ABORT');
						const isAbortedByApp = (err.message === 'NO_TRANSCODED');
						const binariesNotAvailable = (err.message === 'FFBIN_DOWNLOAD_ERROR');
						const isVerticalVideo = (err.message === 'VERTICAL_VIDEO_NOT_SUPPORTED');
						const notMetRequirements = (err.message === 'REQUIREMENTS_NOT_MET');

						if (isCanceledByUser) {
							/**
							 * Handling user cancelled transcoding.
							 * Just stopping video upload...
							 */
							console.log('Transcoding was canceled by user');
							return;
						} else if (isAbortedByApp) {
							/**
							 * Handling not required transcoding cases.
							 * This doesn't cancel video upload...
							 */
							console.log('Transcoding is not required');
						} if (binariesNotAvailable) {
							/**
							 * Handling FF Binaries error.
							 */
							console.log('FF Binaries download error');
						} if (isVerticalVideo) {
							/**
							 * Handling vertical video error.
							 */
							console.log('Transcoding vertical videos is not supported');
						} if (notMetRequirements) {
							console.log('Minimal requirements for computer are not met to transcode');
						} else {
							/**
							 * Anyway transcoding error is not fatal. If
							 * video can't be processed by client then
							 * it would be handled on server. No reason
							 * to report user about any issue related...
							 */

							console.error(err);
						}
					}
				}

        class VideoUploader {
          minChunkSize = 256;

          ptVideoApi = self.app.peertubeHandler.api.videos;

          loadProgress;
          chunkScalingCalculator;
          dataKeeper = {};

          constructor(videoFile) {
            this.static = VideoUploader;

            this.videoFile = videoFile;
          }

          async uploadChunked(startFrom = 0) {
            this.isResumable = true;

            this.videoName = await this.static.getUniqueId(this.videoFile);

            const videoUniqueId = `chunkupload_${this.videoName}`;

            const cachedResumable = this.static.getResumableStorage(videoUniqueId);

            let resumeFrom;

            if (cachedResumable) {
              const timeout12hours = cachedResumable.lastOperation + 12 * 60 * 60 * 1000;

              this.uploadId = cachedResumable.uploadId;

              if (timeout12hours < Date.now()) {
                this.static.deleteResumableStorage(videoUniqueId);
              } else {
                resumeFrom = cachedResumable.resumeFrom;

                const done = this.static.getPercentLoaded(this, resumeFrom);
                this.loadProgress(done);
              }
            } else {
              this.uploadId = await this.static.initResumable(this);
            }

            let chunkPos = resumeFrom || startFrom;

            let chunker = this.getNextChunk(chunkPos);

            let chunkData = chunker.next().value;

            while(chunkData && !this.canceled) {
              const startUpload = Date.now();

              let loadResult = await this.static.loadChunk(this, chunkData, chunkPos)
                .catch((err) => {
                  if (err.reason === 'not_found') {
                    this.static.deleteResumableStorage(videoUniqueId);

                    if (this.canceled) {
                      this.static.deleteResumableStorage(videoUniqueId);

                      throw {
                        text: 'Video upload canceled',
                        cancel: true,
                      };
                    }

                    throw {
                      reason: 'unhandled_error',
                      text: 'Please try uploading again',
                    };
                  }

                  this.static.setResumableStorage(videoUniqueId, {
                    uploadId: this.uploadId,
                    resumeFrom: chunkPos,
                    lastOperation: Date.now(),
                  });

                  throw err;
                });

              this.static.setResumableStorage(videoUniqueId, {
                uploadId: this.uploadId,
                resumeFrom: chunkPos + chunkData.size,
                lastOperation: Date.now(),
              });

              const endUpload = Date.now();

              if (loadResult) {
                this.static.deleteResumableStorage(videoUniqueId);

                return loadResult;
              }

              if (typeof this.chunkScalingCalculator === 'function') {
                this.chunkSize = this.chunkScalingCalculator({
                  time: endUpload - startUpload,
                  videoSize: this.videoFile.size,
                  chunkSize: chunkData.size,
                }, this.dataKeeper);
              }

              if (this.canceled) {
                throw { cancel: true };
              }

              chunkPos += chunkData.size;

              if (typeof this.loadProgress === 'function') {
                const done = this.static.getPercentLoaded(this, chunkPos);
                this.loadProgress(done);
              }

              chunkData = chunker.next().value;
            }
          }

          async upload() {
            this.videoName = await self.static.getUniqueId(this.videoFile);

            this.loadProgress(100);

            return await this.static.uploadVideo(this);
          }

          async cancel() {
            this.canceled = true;

            if (this.isResumable) {
              return this.static.cancelResumable(this);
            }

            return this.static.uploadVideo(this);
          }

          * getNextChunk(startFrom) {
            const videoFile = this.videoFile;
            const videoSize = this.videoFile.size;

            this.chunkSize = this.minChunkSize;

            let position = startFrom;

            do {
              const chunkSize = this.chunkSize;

              const restBytes = videoSize - position;
              const lastChunk = (restBytes < chunkSize);

              let endByte = position + chunkSize;

              if (lastChunk) {
                endByte = videoSize;
              }

              yield videoFile.slice(position, endByte);

              position += chunkSize;
            } while (position < videoSize);
          }

          static async initResumable(self) {
            const data = {};
            const options = {};

            data.video = self.videoFile;
            data.name = self.videoName;
            options.type = 'uploadVideo';

            const { uploadId } = await self.ptVideoApi
              .initResumableUpload(data, options)
              .catch(() => {
                console.log('Resumable video init failed');
              });

            return Promise.resolve(uploadId);
          }

          static async loadChunk(self, chunk, chunkPos) {
            const data = {};
            const options = {};

            data.chunkData = chunk;
            data.chunkPosition = chunkPos;
            data.videoSize = self.videoFile.size;
            data.uploadId = self.uploadId;

            if (self.canceled) {
              return;
            }

            const loadResult = await self.ptVideoApi
              .proceedResumableUpload(data, options)
              .catch(() => {
                throw {
                  reason: 'unhandled_error',
                  text: 'Looks like there are problems with your connection',
                };
              });

            const handleResume = () => {
              const percent = self.videoFile.size / 100;
              const currentPercent = Math.floor(chunkPos / percent);

              if (typeof self.onChunkUploadEnd === 'function' && !self.canceled) {
                self.onChunkUploadEnd(currentPercent);
              }
            };
            const handleUploadEnd = (result) => {
              return result;
            };
            const handleNotFound = () => {
              throw {
                reason: 'not_found',
                text: 'Upload ID does not exist',
              };
            };

            switch (loadResult.responseType) {
              case 'resume_upload': return handleResume();
              case 'upload_end': return handleUploadEnd(loadResult);
              case 'not_found': return handleNotFound();
            }
          }

          static async cancelResumable(self) {
            const videoUniqueId = `chunkupload_${self.videoName}`;

            self.static.deleteResumableStorage(videoUniqueId);

            const cancelResult = await self.ptVideoApi
              .cancelResumableUpload({
                uploadId: self.uploadId,
              })
              .catch(() => {
                throw Error('Resumable video cancel failed');
              });

            const handleSuccess = () => {
              return true;
            };
            const handleNotFound = () => {
              throw Error('Upload ID does not exist');
            };

            switch (cancelResult.responseType) {
              case 'success': return handleSuccess();
              case 'not_found': return handleNotFound();
            }
          }

          static async cancelUpload(self) {
            if (typeof self.cancelToken === 'function') {
              self.cancelToken();
            }
          }

          static async uploadVideo(self) {
            const data = {};
            const options = {};

            data.video = self.videoFile;
            data.name = self.videoName;

            options.type = 'uploadVideo';
            options.cancel = (cancel) => this.cancelToken = cancel;

            const uploadResult = await self.ptVideoApi
              .upload(data, options);

            return uploadResult;
          }

          static async getUniqueId(videoFile) {
            let { lastModified, name, size, type } = videoFile;

            let data = { lastModified, name, size, type };

            let fileExtension = name.match(/\.(.*)/g);

            let uniqueData = JSON.stringify(data);

            let fileDataHash = await VideoUploader.sha256(uniqueData);

            // TODO: Generate hash for file
            return `video_${fileDataHash}${fileExtension}`;
          }

          static getResumableStorage(videoUniqueId) {
            if (!localStorage[videoUniqueId]) {
              return;
            }

            return JSON.parse(localStorage[videoUniqueId]);
          }

          static deleteResumableStorage(videoUniqueId) {
            delete localStorage[videoUniqueId];
          }

          static setResumableStorage(videoUniqueId, data) {
            localStorage[videoUniqueId] = JSON.stringify(data);
          }

          static base64ArrayBuffer(arrayBuffer) {
            var base64    = ''
            var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

            var bytes         = new Uint8Array(arrayBuffer)
            var byteLength    = bytes.byteLength
            var byteRemainder = byteLength % 3
            var mainLength    = byteLength - byteRemainder

            var a, b, c, d
            var chunk

            // Main loop deals with bytes in chunks of 3
            for (var i = 0; i < mainLength; i = i + 3) {
              // Combine the three bytes into a single integer
              chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

              // Use bitmasks to extract 6-bit segments from the triplet
              a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
              b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
              c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
              d = chunk & 63               // 63       = 2^6 - 1

              // Convert the raw binary segments to the appropriate ASCII encoding
              base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
            }

            // Deal with the remaining bytes and padding
            if (byteRemainder == 1) {
              chunk = bytes[mainLength]

              a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

              // Set the 4 least significant bits to zero
              b = (chunk & 3)   << 4 // 3   = 2^2 - 1

              base64 += encodings[a] + encodings[b] + '=='
            } else if (byteRemainder == 2) {
              chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

              a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
              b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

              // Set the 2 least significant bits to zero
              c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

              base64 += encodings[a] + encodings[b] + encodings[c] + '='
            }

            return base64
          }

          static async sha256(string) {
            const encoder = new TextEncoder();
            const data = encoder.encode(string);
            const hash = await crypto.subtle.digest('SHA-256', data);
            return VideoUploader.base64ArrayBuffer(hash);
          }

          static getPercentLoaded(self, chunkPos) {
            const percent = self.videoFile.size / 100;
            return chunkPos / percent;
          }
        }

        const uploader = new VideoUploader(data.video);

        el.uploadProgress
          .find('.upload-progress-bar')
          .removeClass('binaries processing')
          .addClass('uploading');

        el.uploadProgress.find('.bold-font')
          .text(self.app.localization.e('uploadVideoProgress_uploading'))

        el.uploadProgress.removeClass('hidden');

        loadProgress(0);

        uploader.loadProgress = (percent) => {
          loadProgress(percent, true);
        };

        uploader.chunkScalingCalculator = ({ time, videoSize, chunkSize }, data) => {
          if (!data.started) {
            data.countChunks = 0;
          }

          data.started = true;

          if (data.showInfo) {
            console.log('Video will be uploaded in chunks', Math.round(videoSize / chunkSize));
            console.log('Expected time in seconds', (time / 1000) * Math.round(videoSize / chunkSize));
            console.log('Started at', Date.now() / 1000);

            window.ct_expected = Math.floor((time / 1000) * Math.round(videoSize / chunkSize));

            data.showInfo = false;
          }

          if(data.countChunks >= 5 && data.showInfo === undefined) {
            data.showInfo = true;
          }

          data.countChunks++;

          /**
           * TODO: Chunk size optimization is
           *       a complex task. Tests might
           *       resolve some speed issues in
           *       future. Must be tested...
           */

          if (window.cordova || isDeviceMobile()) {
            /** Mobile slow 3G chunking */
            return 256 * 1024;
          }

          /** Regular internet (60 mbit/s) */
          return 256 * 4096;
        };

        initCancelListener(() => uploader.cancel());

        function hideLoadingBar() {
          el.uploadButton.prop('disabled', false);
          el.header.addClass('activeOnRolled');
          el.uploadProgress.addClass('hidden');

          el.preloaderElement.addClass('hidden');

          ed.uploadInProgress = false;
        }

        uploader.uploadChunked()
          .then((response) => {
            loadProgress(100, true);

            setTimeout(() => {
              hideLoadingBar();

              actions.added(response.videoLink, wnd.find('.upload-video-name').val());
              wndObj.close();
            }, 2000);
          })
          .catch((e = {}) => {
            self.app.Logger.error({
              err: e.text || 'videoUploadError',
              payload: JSON.stringify(e),
              code: 401,
            });

						console.error('Uploading error', e);

            hideLoadingBar();

						if (e.cancel) {
							sitemessage('Uploading canceled');
						} else {
							var message =
								e.text ||
								findResponseError(e) ||
								`Uploading error: ${JSON.stringify(e)}`;

							sitemessage(message);
						}
					});

				console.log(data, options);
			});

			el.importUrl.click(() => {
				inputDialogNew({
					caption: self.app.localization.e('importHeading'),
					class: 'importVideoDialog',
					wrap: true,
					values: [
						{
							defValue: '',
							validate: 'empty',
							placeholder: self.app.localization.e('importInputPlaceholder'),
							label: self.app.localization.e('importInputLabel'),
						},
					],

					success: function (v) {
						el.videoInput.prop('disabled', true);

						ed.uploadInProgress = true;
						el.header.removeClass('activeOnRolled');
						el.uploadButton.prop('disabled', true);
						el.uploadProgress.removeClass('hidden');

						var options = {
							type: 'importVideo',
						};

						options.progress = function (percentComplete) {
							var formattedProgress = (percentComplete * 0.9).toFixed(2);

							if (
								formattedProgress === '100.00' &&
								el.preloaderElement.hasClass('hidden')
							) {
								el.preloaderElement.removeClass('hidden');
							}

							el.uploadProgress
								.find('.upload-progress-bar')
								.css('width', formattedProgress + '%');
							el.uploadProgress
								.find('.upload-progress-percentage')
								.text(formattedProgress + '%');
						};

						options.cancel = function (cancel) {
							const cancelCloseFunction = () => {
								if (typeof cancel === 'function') cancel();

								self.closeContainer()
							};

							ed.cancelCloseFunction = cancelCloseFunction;

							el.cancelButton.on('click', () => {
								el.uploadProgress.addClass('hidden');
								el.cancelButton.addClass('hidden');
								el.importUrl.removeClass('hidden');

								el.videoInput.prop('disabled', false);

								ed.uploadInProgress = false;
								cancel();
							});

							el.cancelButton.removeClass('hidden');
						};

						el.importUrl.addClass('hidden');

						self.app.peertubeHandler.api.videos
							.import(
								{
									data: { targetUrl: v[0] },
								},
								options,
							)
							.then((response) => {
								if (response.error) {
									return;
								}

								videoId = response.split('/').pop();

								actions.added(response, wnd.find('.upload-video-name').val());
								ed.uploadInProgress = false;

								wndObj.close();
							})
							.catch((e = {}) => {

								self.app.Logger.error({
									err: e.text || 'videoImportError',
									payload: JSON.stringify(e),
									code: 402,
								});

								el.videoInput.val('');
								el.wallpaperError.text('');

								el.uploadButton.prop('disabled', false);
								el.header.addClass('activeOnRolled');
								el.uploadProgress.addClass('hidden');

								el.importUrl.removeClass('hidden');
								el.videoInput.prop('disabled', false);

								ed.uploadInProgress = false;

								if (e.cancel) {
									sitemessage('Uploading canceled');
								} else {
									var message =
										e.text ||
										findResponseError(e) ||
										`Uploading error: ${JSON.stringify(e)}`;

									sitemessage(message);
								}
							});
					},
				});
			});
		};

		return {
			primary: primary,

			getdata: function (clbk, p) {
				ed = p.settings.essenseData;

				actions = ed.actions;

				var data = {
					hasAccess: false,
					increase: {},
				};

				error = false;

				globalpreloader(true, true);

				self.app.peertubeHandler.api.user
					.me()
					.then((res) => {

						data.hasAccess = true;

						clbk(data);
					})
					.catch((e = {}) => {

						self.app.Logger.error({
							err: e.text || 'getInfoError',
							payload: JSON.stringify(e),
							code: 501,
						});

						data.e = e;
						error = true;

						self.app.platform.sdk.ustate.canincrease(
							{ template: 'video' },
							function (r) {
								data.increase = r;

								clbk(data);
							},
						);
					})
					.then(() => {
						globalpreloader(false);
					});
			},

			destroy: function () {
				el = {};

				if (errorcomp) {
					errorcomp.destroy()
					errorcomp = null
				}
			},

			init: function (p) {
				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.videoInput = el.c.find('.upload-video-file');
				el.videoWallpaper = el.c.find('.upload-video-wallpaper');

				el.videoError = el.c.find('.file-type-error');
				el.wallpaperError = el.c.find('.wallpaper-type-error');

				el.videoLabel = el.c.find('.upload-video-file-label');
				el.wallpaperLabel = el.c.find('.upload-video-wallpaper-label');

				el.uploadProgress = el.c.find('.upload-progress-container');
				el.importUrl = el.c.find('.import-container');

				el.uploadButton = el.c.find('.uploadButton');
				el.cancelButton = el.c.find('.cancelButton');

				el.header = el.c.find('.upload-header');

				el.preloaderElement = el.c.find('.iconwr');

				initEvents();

				renders.videoErrorContainer()

				if (error) el.c.closest('.wnd').addClass('witherror');

				p.clbk(null, p);
			},

			wnd: {
				header: '',
				close: function () {
					if (ed.closeClbk) {
						ed.closeClbk();
					}
				},
				postRender: function (_wnd, _wndObj, clbk) {
					wndObj = _wndObj;
					wnd = _wnd;

					if (clbk) {
						clbk();
					}
				},
				offScroll: true,
				noInnerScroll: true,
				class: 'uploadpeertube normalizedmobile showbetter',
				allowHide: !isTablet(),
				noCloseButton: !isTablet(),
				noButtons: true,
				swipeClose: true,
				swipeCloseDir: 'right',
				swipeMintrueshold: 30,
			},
		};
	};

	self.run = function (p) {
		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);
	};

	self.stop = function () {
		_.each(essenses, function (essense) {
			essense.destroy();
		});
	};

	return self;
})();

if (typeof module != 'undefined') {
	module.exports = uploadpeertube;
} else {
	app.modules.uploadpeertube = {};
	app.modules.uploadpeertube.module = uploadpeertube;
}
