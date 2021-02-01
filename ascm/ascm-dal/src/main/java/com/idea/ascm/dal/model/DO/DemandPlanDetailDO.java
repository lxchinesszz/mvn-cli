import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;

/**
 * @author jmvn-cli
 **/
@TableName(value = "demand_plan_detail", autoResultMap = true)
public class DemandPlanDetailDO implements Serializable {

    private static final long serialVersionUID = 1L;
    
   /**
    * 
    **/
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    public Long id;
    
   /**
    * 仓库id
    **/
    public Long warehouseId;
    
   /**
    * 
    **/
    public Long demandPlanId;
    
   /**
    * 商品配置id
    **/
    public Long goodsDeployId;
    
   /**
    * 条码
    **/
    public String goodsCode;
    
   /**
    * 计算项
    **/
    public Integer calculateItem;
    
   /**
    * 18个月的月份数据
    **/
    public Map monthData;
    
   /**
    * 排序
    **/
    public Integer sortOrder;
    
   /**
    * 逻辑删除
    **/
    public Integer delFlag;
    
   /**
    * 
    **/
    public Date gmtCreate;
    
   /**
    * 
    **/
    public Date gmtModify;
    
   
   /**
    * @param id 
    **/
    public void setId(Long id){
        this.id = id;
    }

   /**
    * @return Long 
    **/
    public Long getId(){
        return id
    }
   
   /**
    * @param warehouseId 仓库id
    **/
    public void setWarehouseId(Long warehouseId){
        this.warehouseId = warehouseId;
    }

   /**
    * @return Long 仓库id
    **/
    public Long getWarehouseId(){
        return warehouseId
    }
   
   /**
    * @param demandPlanId 
    **/
    public void setDemandPlanId(Long demandPlanId){
        this.demandPlanId = demandPlanId;
    }

   /**
    * @return Long 
    **/
    public Long getDemandPlanId(){
        return demandPlanId
    }
   
   /**
    * @param goodsDeployId 商品配置id
    **/
    public void setGoodsDeployId(Long goodsDeployId){
        this.goodsDeployId = goodsDeployId;
    }

   /**
    * @return Long 商品配置id
    **/
    public Long getGoodsDeployId(){
        return goodsDeployId
    }
   
   /**
    * @param goodsCode 条码
    **/
    public void setGoodsCode(String goodsCode){
        this.goodsCode = goodsCode;
    }

   /**
    * @return String 条码
    **/
    public String getGoodsCode(){
        return goodsCode
    }
   
   /**
    * @param calculateItem 计算项
    **/
    public void setCalculateItem(Integer calculateItem){
        this.calculateItem = calculateItem;
    }

   /**
    * @return Integer 计算项
    **/
    public Integer getCalculateItem(){
        return calculateItem
    }
   
   /**
    * @param monthData 18个月的月份数据
    **/
    public void setMonthData(Map monthData){
        this.monthData = monthData;
    }

   /**
    * @return Map 18个月的月份数据
    **/
    public Map getMonthData(){
        return monthData
    }
   
   /**
    * @param sortOrder 排序
    **/
    public void setSortOrder(Integer sortOrder){
        this.sortOrder = sortOrder;
    }

   /**
    * @return Integer 排序
    **/
    public Integer getSortOrder(){
        return sortOrder
    }
   
   /**
    * @param delFlag 逻辑删除
    **/
    public void setDelFlag(Integer delFlag){
        this.delFlag = delFlag;
    }

   /**
    * @return Integer 逻辑删除
    **/
    public Integer getDelFlag(){
        return delFlag
    }
   
   /**
    * @param gmtCreate 
    **/
    public void setGmtCreate(Date gmtCreate){
        this.gmtCreate = gmtCreate;
    }

   /**
    * @return Date 
    **/
    public Date getGmtCreate(){
        return gmtCreate
    }
   
   /**
    * @param gmtModify 
    **/
    public void setGmtModify(Date gmtModify){
        this.gmtModify = gmtModify;
    }

   /**
    * @return Date 
    **/
    public Date getGmtModify(){
        return gmtModify
    }
   
    @Override
    public String toString() {
        return "DemandPlanDetailDO{" +
          ",id=" + this.id + 
          ",warehouseId=" + this.warehouseId + 
          ",demandPlanId=" + this.demandPlanId + 
          ",goodsDeployId=" + this.goodsDeployId + 
          ",goodsCode=" + this.goodsCode + 
          ",calculateItem=" + this.calculateItem + 
          ",monthData=" + this.monthData + 
          ",sortOrder=" + this.sortOrder + 
          ",delFlag=" + this.delFlag + 
          ",gmtCreate=" + this.gmtCreate + 
          ",gmtModify=" + this.gmtModify + 
        "}"
    }
}
