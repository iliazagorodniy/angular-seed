let CommentsApp = angular.module('CommentsApp', [])

CommentsApp.controller('commentsController', ['$scope', '$log', function ($scope) {

  const hierarchy = (
      data = [],
      {idKey='id',parentKey='parentId',childrenKey='children'} = {}
  ) => {
    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {
      const { [idKey]: id, [parentKey]: parentId = 0 } = item;
      childrenOf[id] = childrenOf[id] || [];
      item[childrenKey] = childrenOf[id];
      parentId
          ? (
              childrenOf[parentId] = childrenOf[parentId] || []
          ).push(item)
          : tree.push(item);
    });
    return tree;
  }

  $scope.commentList = []
  $scope.flatCommentList = []
  $scope.addComment = function(parentId = "") {
    console.log($scope.commentValue, $scope.inputReply)
    $scope.flatCommentList.push({ id: String($scope.counter) , content: $scope.commentValue, isTextareaShown: false, parent: String(parentId) })

    console.table($scope.flatCommentList);
    const commentsData = JSON.parse(JSON.stringify($scope.flatCommentList))
    $scope.commentList = hierarchy(commentsData, {idKey: 'id', parentKey: 'parent'})
    console.log($scope.commentList)
    $scope.counter++
  }

  $scope.deleteComment = function (commentId) {
    console.table($scope.flatCommentList)
    $scope.flatCommentList.map((item, index, arr) => {
      if (item.id === commentId || item.parent === commentId) {
        arr.splice(index, 1);
      }
    })
    console.table($scope.flatCommentList)
    const commentsData = JSON.parse(JSON.stringify($scope.flatCommentList))
    $scope.commentList = hierarchy(commentsData, {idKey: 'id', parentKey: 'parent'})
    console.log($scope.commentList)
// пройтись по всем комментам и когда найдется объект с нужным id удалить его
  }
}])