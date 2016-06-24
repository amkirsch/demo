require 'test_helper'

class RecipesControllerTest < ActionController::TestCase
  setup do
    @recipe = recipes(:one)
  end

  test "should get index" do
    get :index, cookbook_id: @recipe.cookbook_id
    assert_response :success
    assert_not_nil assigns(:recipes)
  end

  test "should get new" do
    get :new, cookbook_id: @recipe.cookbook_id
    assert_response :success
  end

  # TODO: Resolve this test case; ensure the test is correct!
  test "should create recipe" do
    assert_difference('Recipe.count') do
      post :create, recipe: { name: @recipe.name }, cookbook_id: @recipe.cookbook_id
    end

    assert_redirected_to cookbook_recipe_url(@recipe)
  end

  test "should show recipe" do
    get :show, id: @recipe, cookbook_id: @recipe.cookbook_id
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @recipe, cookbook_id: @recipe.cookbook_id
    assert_response :success
  end

  test "should update recipe" do
    patch :update, id: @recipe, recipe: { name: @recipe.name }, cookbook_id: @recipe.cookbook_id
    assert_redirected_to cookbook_recipe_url(@recipe, cookbook_id: @recipe.cookbook_id)
  end

  test "should destroy recipe" do
    assert_difference('Recipe.count', -1) do
      delete :destroy, id: @recipe, cookbook_id: @recipe.cookbook_id
    end
  end
end
