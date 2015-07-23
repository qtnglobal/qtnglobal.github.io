'use strict';
angular.module('com.module.users')
  .controller('ProfileCtrl', function($scope, $timeout, CoreService, User, gettextCatalog, $state) {


    $scope.user = User.getCurrent(function(user) {
      console.log(user);
    }, function(err) {
      console.log(err);
    });

    if (typeof $scope.user.avatar == 'undefined'){
      $scope.user.avatar = 'images/qtn.png';
    }
    console.log($scope.user.avatar);

    if (typeof $scope.user.cover == 'undefined'){
      $scope.user.cover = 'images/qtnglobal.png';
    }
    $scope.formFields = [{
      key: 'username',
      type: 'text',
      label: gettextCatalog.getString('Username'),
      required: true
    }, {
      key: 'email',
      type: 'email',
      label: gettextCatalog.getString('E-mail'),
      required: true
    }, {
      key: 'firstName',
      type: 'text',
      label: gettextCatalog.getString('First name'),
      required: true
    }, {
      key: 'lastName',
      type: 'text',
      label: gettextCatalog.getString('Last name'),
      required: true
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      User.upsert($scope.user, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Profile saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving profile'), gettextCatalog.getString(
          'Your profile is not saved: ') + err);
      });
    };

    $scope.changeCover = function(){
      var $ = angular.element;
      $('.navigation').toggleClass('customizing');
      $scope.avaStyle={color:'rgb(250, 250, 250)', 'background-image':'url(https://secure.assets.tumblr.com/images/default_avatar/cube_closed_128.png)'};
    };

    $scope.changeAvatar = function(){
      var $ = angular.element;
      $('.avatarSolution').toggleClass('customizing1');
      $scope.avaStyle={color:'rgb(250, 250, 250)', 'background-image':'url(https://secure.assets.tumblr.com/images/default_avatar/cube_closed_128.png)'};
    };

    $scope.uploadCover = function(item){

      $scope.user.cover = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      if(!$scope.user.cover){
        $scope.user.cover = '/images/qtn.png';
      }

      User.upsert($scope.user, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Profile saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving profile'), gettextCatalog.getString(
          'Your profile is not saved: ') + err);
      });
      item.upload();
      $state.reload();

    };

    $scope.uploadAvatar = function(item){

      $scope.user.avatar = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      User.upsert($scope.user, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Profile saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving profile'), gettextCatalog.getString(
          'Your profile is not saved: ') + err);
      });
      item.upload();
      $state.reload();
    }

  });
