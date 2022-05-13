package com.databaseModeling.Server.services;

import com.databaseModeling.Server.model.conceptionalModel.EntityRelationAssociation;
import com.databaseModeling.Server.model.conceptionalModel.EntityRelationElement;
import com.databaseModeling.Server.model.dataStructure.graph.Graph;
import com.databaseModeling.Server.model.dataStructure.tree.TreeNode;

public interface ITransformMandatoryOneToMandatoryOneService {

    void transformMandatoryOneToMandatoryOneRelations(Graph<TreeNode<EntityRelationElement>, EntityRelationAssociation> erGraph);
}
